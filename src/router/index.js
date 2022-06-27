import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },

  { path: '/login', name: 'Login Page', component: () => import('@/views/pages/Login.vue') },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/categories/Category.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products/Product.vue'),
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/orders/Order.vue'),
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('@/views/stocks/Stock.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/stock-reports',
    name: 'stock-reports',
    component: () => import('@/views/stock-reports/StockReport.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),

    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
    else {
      console.log(to.matched)
      next()
    }
  } else if (localStorage.getItem('isLoggedIn') === 'true' && to.matched.some(record => record.path === '/login')) {
    next({
      path: '/dashboard'
    })
  }
  else {
    next()
  }
})

export default router
