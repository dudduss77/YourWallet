import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginPage from '../views/LoginPage.vue'
import UserSettings from '../views/UserSettings.vue'
import Details from '../views/Details.vue'
import Management from '../views/Management.vue'

import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
      path: '/',
      component: MainPage,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'userSettings',
          name: 'UserSettings',
          component: UserSettings
        },
        {
          path: 'details',
          name: 'Details',
          component: Details,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'management',
          name: 'Management',
          component: Management
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})



router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
})

export default router
