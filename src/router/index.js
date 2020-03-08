import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '数据统计',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/xy',
    component: Layout,
    redirect: '/xy/student',
    name: 'xy',
    meta: {
      title: '学员管理',
      icon: 'xy'
    },
    children: [{
        path: 'student',
        name: 'student',
        component: () => import('@/views/xy/student/index'),
        meta: {
          title: '学生管理',
          icon: 'student'
        }
      },
      {
        path: 'class',
        name: 'class',
        component: () => import('@/views/xy/class/index'),
        meta: {
          title: '班级管理',
          icon: 'class'
        }
      },
      {
        path: 'dorm',
        name: 'dorm',
        component: () => import('@/views/xy/dorm/index'),
        meta: {
          title: '宿舍管理',
          icon: 'dorm'
        }
      },
    ]
  },

  {
    path: '/matter',
    component: Layout,
    redirect: '/matter/img',
    name: 'matter',
    meta: {
      title: '素材管理',
      icon: 'example'
    },
    children: [{
      path: 'img',
      name: 'img',
      component: () => import('@/views/matter/img/index'),
      meta: {
        title: '图片管理',
        icon: 'img'
      }
    }, ]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/new',
    name: 'content',
    meta: {
      title: '内容管理',
      icon: 'content'
    },
    children: [{
        path: 'new',
        name: 'new',
        component: () => import('@/views/content/new/index'),
        meta: {
          title: '新闻管理',
          icon: 'news'
        }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/content/article/index'),
        meta: {
          title: '文章管理',
          icon: 'article'
        }
      },
    ]
  },






  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
