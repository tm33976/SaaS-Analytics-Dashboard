import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../components/layout/DefaultLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../pages/Dashboard.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../pages/Users.vue')
        },
        {
          path: 'sales',
          name: 'Sales',
          component: () => import('../pages/Sales.vue')
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('../pages/Analytics.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../pages/Settings.vue') 
        }
      ]
    }
  ]
});

export default router;