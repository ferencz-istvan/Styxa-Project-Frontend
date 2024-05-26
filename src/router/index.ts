import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import('../views/CitiesView.vue')
    },
    {
      path: '/details/:id/:name',
      name: 'details',
      component: () => import('../views/CityDetailsView.vue'),
      props: true
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('../views/POIView.vue')
    }
  ]
})

export default router
