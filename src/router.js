const Login = () => import('./components/login/login');
const Index = () => import('./components/index/index');

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
    ]
  }
];
export default routers;
