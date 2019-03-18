import Vue from 'vue'
import axios from 'axios'



Vue.prototype.axios = axios;


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    function (config) {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    });