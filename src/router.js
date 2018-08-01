const Login = () => import('./components/login/login');
const Index = () => import('./components/index/index');
const mien = () => import('./components/mien/mienMain');
const forumMain = () => import('./components/forum/forumMain');
const videoViewMain = () => import('./components/videoView/videoViewMain');
const courseMain = () => import('./components/thematicCourse/courseMain');

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
      }
    ]
  }
];
export default routers;
