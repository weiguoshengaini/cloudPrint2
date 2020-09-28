import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@views/layout/index.vue'

Vue.use(Router)
// 不需要权限校验动态添加的路由
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: Layout,
    redirect: '/404/',
    name: 'error',
    // hidden: true,
    meta: {
      title: '404',
      icon: '404'
    },
    children: [{
      path: '/',
      name: '404',
      component: () => import('@views/error-page/404.vue')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  }
]
// 需要权限校验动态添加的路由
export const asyncRoutes = [

  {
    path: '/purchasing-manage',
    component: Layout,
    redirect: '/purchasing-manage/material-purchase',
    name: 'purchasing-manage',
    meta: {
      title: '采购需求管理',
      icon: 'purchasing-manage',
      role: 'purchasing-manage'
    },
    children: [

      {
        path: 'material-purchase',
        name: 'material-purchase',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          title: '新物料申购',
          icon: 'material-purchase',
          role: 'material-purchase'
        },
        // redirect: '/purchasing-manage/material-purchase',
        children: [

          {
            path: '/purchasing-manage/material-purchase',
            name: 'list',
            hidden: true,
            component: () =>
              import('@views/purchasing-manage/material-purchase'),
            meta: {
              perantRedirect: '/purchasing-manage/material-purchase',
              activeMenu: '/purchasing-manage/material-purchase',
              role: 'material-purchase'
            }
          },
          {
            path: 'material-purchase-detail',
            name: 'Detail',
            hidden: true,
            component: () =>
              import('@views/purchasing-manage/material-purchase/detail.vue'),
            meta: {
              title: '申购单详情',
              icon: 'detail',
              activeMenu: '/purchasing-manage/material-purchase',
              role: 'material-purchase-detail'
            }
          }
        ]
      },
      {
        path: 'mould-application-form',
        name: 'mould-application-form',
        component: () =>
          import('@views/purchasing-manage/mould-application-form/index.vue'),
        meta: {
          title: '模具申购单',
          icon: 'mould-application-form',
          role: 'mould-application-form'
        }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [
      ...constantRoutes, // 404 page must be placed at the end !!!
      {
        path: '*',
        redirect: '/404',
        hidden: true
      }
    ]
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
