import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

import Login from '../components/Login.vue'
import WishList from '../components/WishList.vue'
import ReservedWishes from '../components/ReservedWishes.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'WishList',
    component: WishList,
    meta: { requiresAuth: true }
  },
  {
    path: '/reserved',
    name: 'ReservedWishes',
    component: ReservedWishes,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router