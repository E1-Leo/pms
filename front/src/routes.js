import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';  //登录页
import Home from './views/Home.vue';
import UserQ from './views/userM/UserQ.vue';  //用户查询
import UserAdd from './views/userM/UserAdd.vue';  //添加用户
import NotFound from './views/404.vue'; //404
import DiviL from './views/diviM/DiviL.vue';  //部门列表
import DiviAdd from './views/diviM/DiviAdd.vue';  //添加部门
import PosiL from './views/posiM/PosiL.vue';  //职位列表
import PosiAdd from './views/posiM/PosiAdd.vue';  //添加职位
import StaffL from './views/staffM/StaffL.vue';  //员工列表
import StaffAdd from './views/staffM/StaffAdd.vue';  //添加员工
import AnnL from './views/annM/AnnL.vue';  //公告列表
import AnnAdd from './views/annM/AnnAdd.vue';  //添加公告

Vue.use(Router);

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    name: '',
    component: NotFound,
    hidden: true
  },
  {
    path: '/',
    name: '用户管理',
    component: Home,
    children: [
      { path: '/userq', component: UserQ, name: '用户查询' },
      { path: '/useradd', component: UserAdd, name: '添加用户' }
    ]
  },
  {
    path: '/',
    name: '部门管理',
    component: Home,
    children: [
      { path: '/divil', component: DiviL, name: '部门列表' },
      { path: '/diviadd', component: DiviAdd, name: '添加部门' }
    ]
  },
  {
    path: '/',
    name: '职位管理',
    component: Home,
    children: [
      { path: '/posil', component: PosiL, name: '职位列表' },
      { path: '/posiadd', component: PosiAdd, name: '添加职位' }
    ]
  },
  {
    path: '/',
    name: '员工管理',
    component: Home,
    children: [
      { path: '/staffl', component: StaffL, name: '员工列表' },
      { path: '/staffadd', component: StaffAdd, name: '添加员工' }
    ]
  },
  {
    path: '/',
    name: '公告管理',
    component: Home,
    children: [
      { path: '/annl', component: AnnL, name: '公告列表' },
      { path: '/annadd', component: AnnAdd, name: '添加公告' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];
