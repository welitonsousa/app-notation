import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { boot } from 'quasar/wrappers';
import { showMessage } from 'src/utils/MessageError';
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

const newInstanceAxios = axios.create({
  baseURL: "https://apinotation.herokuapp.com",
  headers: { Authorization: `Bearer ${localStorage.getItem('token') || ""}` },
});

export default boot(({ Vue }) => {
  newInstanceAxios.interceptors.response.use(function (response: AxiosResponse) {
    return response;
  }, function (error: any) {
    if (error.response.status == 401) {
      showMessage.error(error);
      setTimeout((e) => {
        localStorage.clear();
        window.location.pathname = '/';
      }, 1000)
    }
    return Promise.reject(error);
  });
  Vue.prototype.$axios = newInstanceAxios;
});
