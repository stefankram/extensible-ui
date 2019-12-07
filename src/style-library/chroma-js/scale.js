/* eslint-disable import/no-extraneous-dependencies */
const chroma = require('chroma-js');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

const sassToHex = (color) => chroma(color.getR(), color.getG(), color.getB()).hex();

const roundRgb = (rgb) => [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])];

const rgbToSass = (rgb) => {
  const roundedRgb = roundRgb(rgb);
  return new sass.types.Color(roundedRgb[0], roundedRgb[1], roundedRgb[2]);
};

module.exports = {
  'chromatic-lab($x, $y, $z)': (x, y, z) => {
    return rgbToSass(chroma.lab(x.getValue(), y.getValue(), z.getValue()).rgb());
  },
  'chromatic-lch($x, $y, $z)': (x, y, z) => {
    return rgbToSass(chroma.lch(x.getValue(), y.getValue(), z.getValue()).rgb());
  },
  'chromatic-scale($argsList...)': (argsList) => {
    const defaultOpts = {
      mode: 'lab',
      colors: 10,
      correctLightness: false,
      bezier: false,
    };
    const options = { ...defaultOpts };
    let colors = [];

    for (let i = 0; i < argsList.getLength(); i += 1) {
      const arg = argsList.getValue(i);
      const argType = sassUtils.typeOf(arg);

      switch (argType) {
        case 'map':
          for (let j = 0; j < arg.getLength(); j += 1) {
            options[arg.getKey(j).getValue()] = Number(arg.getValue(j).getValue());
          }
          break;
        case 'list':
          colors = sassUtils.castToJs(arg).map((color) => sassToHex(color));
          break;
        case 'color':
          colors.push(sassToHex(arg));
          break;
        default:
          throw TypeError('Unexpected type in argument list');
      }
    }

    let scale = options.bezier
      ? chroma.bezier(colors).scale()
      : chroma.scale(colors).mode(options.mode);
    if (options.correctLightness) {
      scale = scale.correctLightness();
    }

    colors = scale.colors(options.colors);
    const sassList = new sass.types.List(options.colors);
    colors.forEach((color, i) => sassList.setValue(i, rgbToSass(chroma(color).rgb())));
    return sassList;
  },
};
