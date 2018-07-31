import axios from 'axios';
import store from './store';
// http request
axios.interceptors.request.use(config => {
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  if (store.getters.getToken !== '') {
    //  存在将token写入 request header
    config.headers.Authorization = store.getters.getToken;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// http response 服务器响应拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //       // 这里写清除token的代码
  //       this.$router.replace({
  //         path: 'login',
  //         query: {redirect: this.$router.currentRoute.fullPath}// 登录成功后跳入浏览的当前页面
  //       });
  //   }
  // }
  return Promise.resolve(error.response);
});
export default axios;
