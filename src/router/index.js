import Vue from 'vue'
import VueRouter from 'vue-router'
import $ from 'jquery'
import HomeView from '../views/IndexView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '阳光彩虹小白马-首页',
    },
    component: HomeView
  },
  {
    path: '/goods/:id',
    name: 'goods',
    props: true,
    meta: {
      title: '阳光彩虹小白马-商品',
    },
    component: () => import('../views/GoodsView.vue')
  },
  {
    path: '/users/:id',
    name: 'users',
    props: true,
    meta: {
      title: '阳光彩虹小白马-用户',
      isAuth: true,
    },
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/404',
    name: '404',
    props: true,
    meta: {
      title: '阳光彩虹小白马-404',
    },
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("userInfo") && to.meta.isAuth)
    next({ name: '404', params: { message: "500,请先登录🤡" } })
  !to.matched.length ? next({ name: '404', params: { message: "404,输入的网站有错误! 🤡" } }) : name = '阳光彩虹小白马'
  window.scrollTo({ top: 0, behavior: "smooth" })
  document.title = to.meta.title
  next()
})
export default router
