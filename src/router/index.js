import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('@/views/CategoryView.vue')
    },
    {
      path: '/practice/:id/:mode',
      name: 'practice',
      component: () => import('@/views/PracticeView.vue')
    },
    {
      path: '/study/:id',
      name: 'study',
      component: () => import('@/views/StudyView.vue')
    }
  ]
})

export default router
