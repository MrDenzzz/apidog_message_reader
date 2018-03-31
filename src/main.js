import Vue from 'vue'
import App from './App.vue'
import moment from 'vue-moment'

Vue.use(moment);

new Vue({
  el: '#app',
  render: h => h(App)
})
