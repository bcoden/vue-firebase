import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

//  Lazy Load routes

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/sign-up', component: 'SignUp' },
  { path: '/sign-in', component: 'SignIn' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound' }
]

// lazy load routes
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthorized = firebase.auth().currentUser

  if (requiresAuth && !isAuthorized) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
