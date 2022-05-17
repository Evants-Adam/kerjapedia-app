import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$baseEndpoint = "https://kerjapedia.herokuapp.com";
new Vue({ render: createElement => createElement(App) }).$mount('#app');