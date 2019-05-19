import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserList from './views/user/UserList.vue'
import UserEdit from './views/user/UserEdit.vue'
import UserRegister from './views/user/UserRegister.vue'
import RealEstateList from './views/real-estate/RealEstateList.vue'
import RealEstateEdit from './views/real-estate/RealEstateEdit.vue'
import ProprietorList from './views/proprietor/ProprietorList.vue'
import ProprietorEdit from './views/proprietor/ProprietorEdit.vue'
import PersonInfo from './views/person-info/PersonInfo.vue'
import BaList from './views/ba/BaList.vue'
import BaEdit from './views/ba/BaEdit.vue'
import BjList from './views/bj/BjList.vue'
import BjEdit from './views/bj/BjEdit.vue'
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
        path: '/person-info',
        name: 'person-info',
        component: PersonInfo
      }, {
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
        path: '/real-estate-list',
        name: 'real-estate-list',
        component: RealEstateList
      }, {
        path: '/real-estate-edit/:type/:id',
        name: 'real-estate-edit',
        component: RealEstateEdit
      }, {
        path: '/proprietor-list',
        name: 'proprietor-list',
        component: ProprietorList
      }, {
        path: '/proprietor-edit/:type/:id',
        name: 'proprietor-edit',
        component: ProprietorEdit
      }, {
        path: '/ps',
        name: 'ps',
        component: Ps
      }, {
        path: '/ba-list',
        name: 'ba-list',
        component: BaList
      }, {
        path: '/ba-edit/:type/:id',
        name: 'ba-edit',
        component: BaEdit
      }, {
        path: '/bj-list',
        name: 'bj-list',
        component: BjList
      }, {
        path: '/bj-edit/:type/:id',
        name: 'bj-edit',
        component: BjEdit
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