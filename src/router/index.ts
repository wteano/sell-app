import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/goods' },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/goods/Goods.vue')
  },
  {
    path: '/rate',
    name: 'rate',
    component: () => import('@/views/rate/Rate.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/shop/Shop.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
