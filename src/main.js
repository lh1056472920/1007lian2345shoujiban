// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import router from './router';
import axios from "axios";
import $ from "jquery";
import 'muse-ui/lib/styles/base.less';
import {
  LoadMore
} from 'muse-ui';

import 'muse-ui/lib/styles/theme.less';
// import '@/assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(Router);
Vue.use(LoadMore)

// Vue.use(Rem)

// axios.defaults.baseURL = 'http://www.lian2345.com'
axios.defaults.baseURL = 'https://datas.blockgdex.com'

// 判断页面跳转


// const $= axios.create({
//   baseURL: `http://wwww.lian2345.com`,
//  })
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
