import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoutinesView from '../views/RoutinesView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoginView from '../views/auth/LoginView.vue'

import AuthLayout from '@/layouts/auth.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/temporary',
      name: 'temporary',
      component: RoutinesView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      component: LoginView,
      meta: {
        layout: AuthLayout,
      },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.path === '/auth/login' && authStore.getUser) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
