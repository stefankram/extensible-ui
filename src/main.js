import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import App from './App.vue';

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
});
