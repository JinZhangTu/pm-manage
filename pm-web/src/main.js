import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element'
import './plugins/fontawesome'
import './plugins/axios'
import './plugins/moment'

import './assets/css/common.css'
import './assets/fonts/css/style.css'

Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    // localStorage.removeItem('Authorization');
    // localStorage.removeItem('name');
    // localStorage.removeItem('admin');
    localStorage.clear();
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')