const Login = () => import('./components/login/login');
const Index = () => import('./components/index/index');
const mien = () => import('./components/mien/mienMain');
const forumMain = () => import('./components/forum/forumMain');
const noteList = () => import('./components/forum/noteList');
const noteContent = () => import('./components/forum/noteContent');
const videoViewMain = () => import('./components/videoView/videoViewMain');
const courseMain = () => import('./components/thematicCourse/courseMain');
const myMain = () => import('./components/setting/myMain');
const storeList = () => import('./components/setting/memberStore/storeList');
const goodsInfo = () => import('./components/setting/memberStore/goodsInfo');
const shopCart = () => import('./components/setting/memberStore/shopCart');
const orderList = () => import('./components/setting/memberStore/orderList');

const routers = [ // 定义vue-router的路径和对应的组件，注意是component 不是components
  {
    path: '/',
    redirect: '/login' // 指定默认页面
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        name: 'mien', path: '/mien', component: mien
      },
      {
        name: 'forumMain', path: '/forumMain', component: forumMain
      },
      {
        name: 'videoViewMain', path: '/videoViewMain', component: videoViewMain
      },
      {
        name: 'courseMain', path: '/courseMain', component: courseMain
      },
      {
        name: 'noteList', path: '/noteList', component: noteList
      },
      {
        name: 'noteContent', path: '/noteContent', component: noteContent
      },
      {
        name: 'myMain', path: '/myMain', component: myMain
      },
      {
        name: 'storeList', path: '/storeList', component: storeList
      },
      {
        name: 'goodsInfo', path: '/goodsInfo', component: goodsInfo
      },
      {
        name: 'shopCart', path: '/shopCart', component: shopCart
      },
      {
        name: 'orderList', path: '/orderList', component: orderList
      }
    ]
  }
];
export default routers;
