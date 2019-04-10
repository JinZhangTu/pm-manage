import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserList from './views/user/UserList.vue'
import UserEdit from './views/user/UserEdit.vue'
import UserRegister from './views/user/UserRegister.vue'
import RealEstate from './views/real-estate/RealEstateList.vue'
import ProprietorList from './views/proprietor/ProprietorList.vue'
import Ps from './views/proprietor-serve/ps.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // name: 'home',
      // component: Home
      redirect: '/login'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [{
        path: '/user-list',
        name: 'user-list',
        component: UserList
      }, {
        path: '/user-edit/:type/:id',
        name: 'user-edit',
        component: UserEdit
      }, {
        path: '/user-register',
        name: 'user-register',
        component: UserRegister
      }, {
        path: '/real-estate',
        name: 'real-estate',
        component: RealEstate
      }, {
        path: '/proprietor-list',
        name: 'proprietor-list',
        component: ProprietorList
      }, {
        path: '/ps',
        name: 'ps',
        component: Ps
      }],
      beforeEnter: (to, from, next) => {
        var token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
          next({
            path: '/login'
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },




    // 当页面地址和上面任一地址不匹配，则跳转到404
    {
      path: '*',
      redirect: '/404'
    }
  ]
})