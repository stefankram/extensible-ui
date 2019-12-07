<template>
  <div class="e__colors">
    <div
      v-for="color in colors"
      :key="color"
      class="e__swatch"
    >
      <div
        v-for="i in 11"
        :key="i"
        class="e__color"
        :style="{
          backgroundColor: `var(--e-${color}-${i - 1})`,
          color: `var(--e-color-contrast-${i - 1})`,
        }"
      >
        --e-{{ color }}-{{ i - 1 }} &nbsp; {{ getColorCode(color, i) }}
      </div>
    </div>
    <div
      v-for="color in colors"
      :key="color"
      class="e__swatch"
    >
      <div
        v-for="i in 11"
        :key="i"
        class="e__color"
        :style="{
          backgroundColor: `var(--e-color-contrast-${i - 1})`,
          color: `var(--e-${color}-${i - 1})`,
        }"
      >
        --e-{{ color }}-{{ i - 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'grey',
        'red',
        'orange',
        'bronze',
        'olive',
        'green',
        'teal',
        'blue',
        'purple',
        'violet',
        'magenta',
        'pink',
      ],
    };
  },

  methods: {
    getColorCode(color, i) {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--e-${color}-${i - 1}`);
    },
  },
};
</script>

<style>
.e__colors {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  grid-gap: 10px;
}

.e__color {
  font-size: 14px;
  height: 30px;
  font-family: Consolas, monospace;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>
