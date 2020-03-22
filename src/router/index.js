import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginPage from '../views/LoginPage.vue'
import UserSettings from '../views/UserSettings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'userSettings',
        name: 'UserSettings',
        component: UserSettings
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
