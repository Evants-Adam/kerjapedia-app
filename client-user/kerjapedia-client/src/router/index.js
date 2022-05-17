import Vue from 'vue'
import VueRouter from 'vue-router'
import Swal from 'sweetalert2'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/bookmark-jobs',
    name: 'BookmarkPage',
    component: () => import('../views/BookmarkPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'DetailPage',
    component: () => import('../views/DetailPage.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'Home' || to.name === 'BookmarkPage' || to.name === 'DetailPage') && !localStorage.getItem('access_token')) {
    next({ name: 'Login' })
    Swal.fire({
      icon: 'warning',
      title: 'You have to login to continue..'
    })
  } else if ((to.name === 'Login' || to.name === 'Register' || to.name === 'LandingPage') && localStorage.getItem('access_token')) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
