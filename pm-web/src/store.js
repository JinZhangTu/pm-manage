import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    admin: localStorage.getItem('admin') ? localStorage.getItem('admin') : ''
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      state.name = user.name;
      state.admin = user.admin;
      localStorage.setItem('Authorization', user.Authorization);
      localStorage.setItem('name', user.name);
      localStorage.setItem('admin', user.admin);
    }
  },
  actions: {

  }
})