import Vue from 'vue';
import App from './App.vue';
import routes from './routes';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';

Vue.use(iView);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
