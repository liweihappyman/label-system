import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ImageCapture from './views/ImageCapture.vue'
import Home from './views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/image-capture',
    name: 'ImageCapture',
    component: ImageCapture
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router