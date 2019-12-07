<template>
  <div id="app">
    <e-colors />
  </div>
</template>

<script>
import eColors from './style-library/colors/colors.vue';

export default {
  components: {
    eColors,
  },

  data() {
    return {
      message: 'Hello World',
    };
  },
};
</script>

<style lang="scss">
@import './style-library/styles.scss';

body {
  font-family: var(--e-font-family);
  font-size: var(--e-font-size-medium);
}
</style>
