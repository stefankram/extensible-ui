<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
export default {
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
  font-weight: var(--e-font-weight-bold);
  font-size: var(--e-font-size-medium);
}
</style>
