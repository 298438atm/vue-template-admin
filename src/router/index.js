import Vue from 'vue'
import VueRouter from 'vue-router'
import SessiomCrud from '@/utils/sessionCRUD'
import { Notification } from 'element-ui';
import store from '@/store/index'
import { Loading } from 'element-ui';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

function addRoutes(routesList) {
  const waitAddRoutes = {
    path: '',
    component: () => import('@/layout/index.vue'),
    children: formatRoutes(routesList)
  }
  router.addRoute(waitAddRoutes)
  router.addRoute({
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  })
}

function formatRoutes(routes) {
  const resRoutes = []
  routes.forEach(item => {
    let obj = {
      path: item.path || '',
      meta: { name: item.name, keepAlive: item.keepAlive || false },
      component: routerCompnentHanlde(item, 1),
      name: item.name
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      obj.children = formatRoutes(item.children)
    }
    resRoutes.push(obj)
  })
  return resRoutes
}

// 处理路由组件
function routerCompnentHanlde(route, type) {
  if (route.type === 'page') {
    return () => import(`@/views/${route.component}`)
  } else {
    return {
      render(c) {
        return c('router-view')
      }
    }
  }
}

router.beforeEach((to, from, next) => {
  document.title = to.name
  if (to.path === '/login') {
    next()
    return
  }
  if (SessiomCrud.get('token')) {
    const { routes } = store.state.user
    if (routes.length === 0) {
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: '页面加载中...',
        background: '#fff'
      });
      store.dispatch('user/getMenu').then(res => {
        addRoutes(res)
        loadingInstance.close()
        next(to.path)
      })
    } else {
      next()
    }
  } else {
    Notification({ title: '提示', message: 'token不存在！请重新登录', type: 'error' })
    next('/login')
  }
})

// 解决重复点击的问题
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}

export default router
