import axios from "axios";
import constant from "./config";
import { startLoading, stopLoading } from "../actions/loadingActions";
import store from "../store";

axios.defaults.baseURL = constant.API_HOST;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = constant.RESPONSE_TIMEOUT;

axios.interceptors.request.use(function (config) {
  store.dispatch(startLoading());
  return config;
}, function (error) {
  store.dispatch(stopLoading());
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  store.dispatch(stopLoading());
  return response;
}, function (error) {
  store.dispatch(stopLoading());
  return Promise.reject(error);
});

export default axios;