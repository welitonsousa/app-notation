import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'home' , component: () => import('pages/PageHome.vue') },
      { path: '/create', name: 'create' , component: () => import('src/pages/PageCreateUser.vue') },
      { path: '/login', name: 'login' , component: () => import('pages/PageLogin.vue') },
      { path: '/who', name: 'who' , component: () => import('pages/PageWho.vue') },
      { path: '/contact', name: 'contact' , component: () => import('pages/PageContact.vue') },

    ]
  },
  {
    path: '/notes',
    component: () => import('layouts/LayoutAuthenticate.vue'),
    children: [
      { path: '/notes', name: 'notes' , component: () => import('pages/PageNotes.vue') },
    ]
  },
  {
    path: '*',
    component: () => import('src/pages/PageNotFound.vue')
  }
];

export default routes;
