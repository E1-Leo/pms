import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';  //登录页
import Home from './views/Home.vue';
import UserList from './views/userManage/UserList.vue';  //用户查询
import UserAdd from './views/userManage/UserAdd.vue';  //添加用户
import NotFound from './views/404.vue'; //404
import DepartmentList from './views/departmentManage/DepartmentList.vue';  //部门列表
import DepartmentAdd from './views/departmentManage/DepartmentAdd.vue';  //添加部门
import StaffList from './views/staffManage/StaffList.vue';  //员工列表
import StaffAdd from './views/staffManage/StaffAdd.vue';  //添加员工
import AnnouncementList from './views/announcementManage/AnnouncementList.vue';  //公告列表
import AnnouncementAdd from './views/announcementManage/AnnouncementAdd.vue';  //添加公告

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
    name: '404',
    component: NotFound,
    hidden: true
  },
  {
    path: '/',
    name: '用户管理',
    component: Home,
    children: [
      { path: '/userlist', component: UserList, name: '用户列表' },
      { path: '/useradd', component: UserAdd, name: '添加用户' }
    ]
  },
  {
    path: '/',
    name: '部门管理',
    component: Home,
    children: [
      { path: '/departmentlist', component: DepartmentList, name: '部门列表' },
      { path: '/departmentadd', component: DepartmentAdd, name: '添加部门' }
    ]
  },
  {
    path: '/',
    name: '员工管理',
    component: Home,
    children: [
      { path: '/stafflist', component: StaffList, name: '员工列表' },
      { path: '/staffadd', component: StaffAdd, name: '添加员工' }
    ]
  },
  {
    path: '/',
    name: '公告管理',
    component: Home,
    children: [
      { path: '/announcementlist', component: AnnouncementList, name: '公告列表' },
      { path: '/announcementadd', component: AnnouncementAdd, name: '添加公告' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];
