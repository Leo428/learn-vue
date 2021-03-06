import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Scout from '@/pages/Scout'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/scout',
      name: 'scout',
      component: Scout,
      meta: {
        title: 'Eagle Engineering',
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (requiresAuth && !currentUser) {
    next('login')
  } else if (!requiresAuth && currentUser) {
    next('scout')
  } else {
    next()
  }
})

export default router
