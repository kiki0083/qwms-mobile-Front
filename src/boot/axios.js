import { boot } from "quasar/wrappers";
import { Loading, QSpinnerCube } from "quasar";
import axios from "axios";

//const targetUrl = "http://localhost:8080";
//const targetUrl = 'http://127.0.0.1:8080';
//const targetUrl = 'http://115.71.21.16:9002';
//const targetUrl = 'http://192.168.0.78:8080';

const targetUrl = import.meta.env.VITE_APP_AXIOS_BASE_URL; //axios 호출 url

var LOADING_STATE = true; //로딩제어 초기값
var LOADING_SPINNER = QSpinnerCube; //스피너모양

//axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: targetUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 1000 * 600,
});

//로딩제어
const loading = (status) => {
  if (LOADING_STATE) {
    if (status) {
      Loading.show({ spinner: LOADING_SPINNER }); // 로딩시작
    } else {
      Loading.hide(); //종료
    }
  }
};

api.interceptors.request.use(
  (config) => {
    loading(true); //로딩시작
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    loading(false); //로딩종료
    LOADING_STATE = true; //로딩값 원복
    LOADING_SPINNER = QSpinnerCube; //스피너 모양 원복

    return res.config.originalResponse ? res : res.data;
  },
  (error) => {
    loading(false); //로딩종료
    LOADING_STATE = true; //로딩값 원복
    LOADING_SPINNER = QSpinnerCube; //스피너 모양 원복

    var response = error.response;
    if (response) {
      return Promise.reject(response.data);
    }
    alert("인터넷 연결 상태를 확인해주세요");
    return new Promise(function () {});
  }
);

const useAxios = (
  method,
  url,
  param = {},
  loadingState = true,
  loadingSpinner = LOADING_SPINNER
) => {
  LOADING_STATE = loadingState; //로딩 사용유무
  LOADING_SPINNER = loadingSpinner; //로딩 모양

  return api({ method: method, url: url, data: param });
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api, useAxios };
