/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/layouts/main/index.vue'
import Home from '@/views/Home.vue'

export const MainRouters = [
  {
    name: 'Home',
    path: '',
    meta: {
      icon: '/menu/home.svg',
      title: 'Home',
    },
    component: Home,
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Main',
    path: '/',
    component: Main,
    redirect: '',
    children: MainRouters,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      resolve({ left: 0, top: 0 })
    })
  },
})

// router.beforeEach(async (to) => {})
export default router
