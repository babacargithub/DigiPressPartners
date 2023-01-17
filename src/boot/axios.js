import { boot } from 'quasar/wrappers'
import axios from 'axios'
import ApiResponseHandler from "../utils/ApiResponseHandler";
import loginCredentials from "src/repository/LoginCredentials";


// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export const BASE_URL =  process.env.NODE_ENV === "development" ? "http://localhost:8888/DigiPress/DigiPressBackend/public/" : "https://digipress.golobone.net/"
const api = axios.create({ baseURL: 'https://admin.senapel.com/api/' })
export let partnersConfig = {
  // baseURL: process.env.NODE_ENV === "development"?'http://localhost/senapel/public/api/':'https://golobone.net/go_travel_v4/public/api/'
  baseURL: BASE_URL+'partners/'
  // baseURL: process.env.NODE_ENV === "development"?'http://Localhost/GO_SYS_V4/public/api/':'http://192.168.1.17/GO_SYS_V4/public/api/'
  // timeout: 60 * 1000, // Timeout
};
export let apiConfig = {
  // baseURL: process.env.NODE_ENV === "development"?'http://localhost/senapel/public/api/':'https://golobone.net/go_travel_v4/public/api/'
  baseURL: BASE_URL+'api'
  // baseURL: process.env.NODE_ENV === "development"?'http://Localhost/GO_SYS_V4/public/api/':'http://192.168.1.17/GO_SYS_V4/public/api/'
  // timeout: 60 * 1000, // Timeout
};
export let backendWeb = {
  // baseURL: process.env.NODE_ENV === "development"?'http://localhost/senapel/public/api/':'https://golobone.net/go_travel_v4/public/api/'
  baseURL: BASE_URL
  // baseURL: process.env.NODE_ENV === "development"?'http://Localhost/GO_SYS_V4/public/api/':'http://192.168.1.17/GO_SYS_V4/public/api/'
  // timeout: 60 * 1000, // Timeout
};
export default boot(({ app, store, router}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  let _axios = axios.create(partnersConfig);

  const actionScope = `loader`;
  let requestsPending = 0;

  const req = {
    pending: () => {
      requestsPending++;
      store.dispatch(`${actionScope}/showIsLoadingIndicator`);
      app.config.globalProperties.$q.loading.show({
        message: 'Chargement....',
        // boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        store.dispatch(`${actionScope}/hideIsLoadingIndicator`);
        app.config.globalProperties.$q.loading.hide()
      }
    }
  };
  _axios.interceptors.request.use(
    config => {
      if (typeof config.shouldNotShowLoadingIndicator === 'undefined' &&  !config.shouldNotShowLoadingIndicator){
        req.pending();
      }

      config.headers = {
        'Authorization': `Bearer ${store.state.user_login.user.token}`,
        'Accept':'application/json',
        'Content-Type':'application/json',
      }
      return config;
    },
    error => {
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );
  _axios.interceptors.response.use(
    (response) => {
      req.done();
      response = new ApiResponseHandler(response)
      return Promise.resolve(response);
    },
    error => {
      req.done();
      error.response = new ApiResponseHandler(error.response)
      if (error.response.isUnauthorized()){
        loginCredentials.logout()
        router.push('/login')
      }else if(error.response.isInternalServerError()) {
        store.dispatch(`${actionScope}/showErrorOccurred`);

      }

      return Promise.reject(error.response);
    }
  );
  _axios.defaults.withCredentials = true;

  app.config.globalProperties.$axios = _axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }


//======================== Config

