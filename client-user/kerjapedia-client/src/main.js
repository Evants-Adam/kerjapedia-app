import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/bootstrap.min.css'
import './assets/css/materialdesignicons.min.css'
import './assets/css/style.css'

Vue.config.productionTip = false
Vue.prototype.$baseEndPoint = 'https://kerjapedia.herokuapp.com/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
