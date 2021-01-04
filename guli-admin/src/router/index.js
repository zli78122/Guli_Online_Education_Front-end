import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: 'Instructor',
    meta: { title: 'Instructor', icon: 'peoples' },
    children: [
      {
        path: 'table',
        name: 'Instructor List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: 'Instructor List', icon: 'list' }
      },
      {
        path: 'save',
        name: 'Instructor Add',  
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Instructor Add', icon: 'edit' }
      },
      {
        path: 'edit/:id',   
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Instructor Update', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'Course Category',
    meta: { title: 'Course Category', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: 'Category List',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: 'Category List', icon: 'tree' }
      },
      {
        path: 'save',
        name: 'Category Add',  
        component: () => import('@/views/edu/subject/save'),
        meta: { title: 'Category Add', icon: 'excel' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course',
    meta: { title: 'Course', icon: 'school' },
    children: [
      {
        path: 'list',
        name: 'Course List',
        component: () => import('@/views/edu/course/list'),
        meta: { title: 'Course List', icon: 'calendar' }
      },
      {
        path: 'info',
        name: 'Course Add',  
        component: () => import('@/views/edu/course/info'),
        meta: { title: 'Course Add', icon: 'add' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: 'Update Basic Info', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: 'Update Chapter', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: 'Course Publish', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/create',
    name: 'Statistics',
    meta: { title: 'Statistics', icon: 'trend' },
    children: [
      {
        path: 'create',
        name: 'Generate Stats',
        component: () => import('@/views/sta/create'),
        meta: { title: 'Generate Stats', icon: 'example' }
      },
      {
        path: 'show',
        name: 'Show Stats',
        component: () => import('@/views/sta/show'),
        meta: { title: 'Show Stats', icon: 'chart' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/zli78122/Guli_Online_Education',
        meta: { title: 'Source Code', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
