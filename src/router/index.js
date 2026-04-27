import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: () => import('@/views/ImpressumView.vue'),
    },
    {
      path: '/datenschutzerklaerung',
      name: 'Datenschutzerklärung',
      component: () => import('@/views/DatenschutzerklaerungView.vue'),
    },
  ],
})

export default router
