import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/content/Dashboard.vue';


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('@/views/SignIn.vue')
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
