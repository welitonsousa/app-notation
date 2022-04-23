import { RouteConfig } from 'vue-router';
import { Vue } from "vue-property-decorator";

const noAuthRoute = (to: any, from: any, next: any) => {
  const token = localStorage.token
  if (token) {
    Vue.prototype.$axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
    next('/initial');
  }
  else next()
}

const authRoute = (to: any, from: any, next: any) => {
  const token = localStorage.token
  if (!token) next('/')
  else {
    Vue.prototype.$axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
    next()
  }
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/LayoutAuthenticate.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/PageHome.vue'), beforeEnter: noAuthRoute },
      { path: '/create', name: 'create', component: () => import('src/pages/PageCreateUser.vue'), beforeEnter: noAuthRoute },
      { path: '/login', name: 'login', component: () => import('pages/PageLogin.vue'), beforeEnter: noAuthRoute },
      { path: '/about', name: 'about', component: () => import('pages/PageAbout.vue') },
      { path: '/initial', name: 'initial', component: () => import('pages/PageInitial.vue'), beforeEnter: authRoute },
    ]
  },
  { path: '/politicas', name: 'initial', component: () => import('pages/Politicas.vue')},
  {
    path: '*',
    component: () => import('src/pages/PageNotFound.vue')
  }
];

export default routes;
