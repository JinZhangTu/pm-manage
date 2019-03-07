import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element'
import './plugins/fontawesome'
import './plugins/axios'

import './assets/css/common.css'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')