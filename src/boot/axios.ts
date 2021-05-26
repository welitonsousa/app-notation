import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

const newInstanceAxios = axios.create({
  baseURL: "https://apinotation.herokuapp.com",
  headers: {Authorization: `Bearer ${localStorage.getItem('token') || ""}`}
});

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = newInstanceAxios;
});
