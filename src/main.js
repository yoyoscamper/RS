// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'; // 引入vue
/**
 * 自适应布局，首先安装lib-flexible在项目目录运行命令：npm i lib-flexible --save
 * 再安装px2rem-loade 运行命令：npm install px2rem-loader, 在build下utils.js中配置px2rem-loade
 */
// import 'lib-flexible';
import App from './App'; // 引入src目录下的App.vue
import routers from './router';
import VueRouter from 'vue-router'; // 引入vue-router
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ZkTable from 'vue-table-with-tree-grid';

import store from './store';
// import mock from './components/mock/index';
// import axios from './axios';
import axios from 'axios';
/**
 * 先运行npm install vue-resource --save
 */
import vueResource from 'vue-resource';
import EasyScroll from 'easyscroll';
Vue.use(EasyScroll);
Vue.use(vueResource);
Vue.config.productionTip = false; // 来关闭生产模式下给出的提示
Vue.prototype.$axios = axios.create({
  headers: {
    'x-ml-appid': '5add7ee40351cb0007295c8f',
    'x-ml-apikey': 'amtKNmFmbS1YVm9wbHRfWFNJdDFYZw',
    'content-type': 'application/json'
  }
});
Vue.prototype.$store = store;
// Vue.use(mock);
axios.defaults.withCredentials = true;// 让ajax携带cookie
Vue.use(VueRouter); // 使用vue-router
Vue.use(ElementUI);
Vue.use(ZkTable);
const router = new VueRouter({
  mode: 'history',
  // base: '/mes',
  routes: routers
});
/* eslint-disable no-new */
new Vue({
  el: '#app', // App.vue中的id=app的div
  router,
  store,
  template: '<App/>', // 这里是把'./App'的内容加到这个模板中
  components: { App } // 这里的App等于App: App ，名称要和模板名称一样，上面的template中写的App,这里也要是App
});
