/* eslint-disable no-console */
import axios from 'axios';
// import store from './../store';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api/v1'
});

axios.interceptors.request.use(config => {
  // if (store.state.token) {
  //   axios.defaults.headers.common['Authorization'] =
  //     'Bearer ' + store.state.token;
  // }
  return config;
});

axios.interceptors.response.use(res => {
  console.log('Response', res);
  return res;
});

export default instance;