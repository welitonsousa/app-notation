import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'home' , component: () => import('pages/PageHome.vue') },
      { path: '/singup', name: 'singup' , component: () => import('pages/PageSingup.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('src/pages/PageNotFound.vue')
  }
];

export default routes;
