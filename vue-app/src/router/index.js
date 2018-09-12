import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Upload from '@/components/Upload'
import store from '../store'
import { auth } from '../repositories/lib/helpers'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    { path: '*', redirect: '/' }
  ]
})

const authenticatedRoutes = ['Profile', 'Upload']
const unauthenticatedRoutes = ['Home', 'Signup', 'Login']

router.beforeEach((to, from, next) => {
  const hasStoredUser = store.getters['user/hasStoredUser']
  if (unauthenticatedRoutes.includes(to.name)) {
    if (hasStoredUser) {
      next('/profile')
    } else if (auth.hasToken()) {
      store.dispatch('user/checkUser', '/profile').then(route => {
        next(route)
      })
    } else {
      next()
    }
  } else if (authenticatedRoutes.includes(to.name) && !hasStoredUser) {
    if (auth.hasToken()) {
      store.dispatch('user/checkUser', to.path).then(route => {
        next(route)
      })
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
