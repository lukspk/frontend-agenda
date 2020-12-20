import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false;


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import swal from "sweetalert";
// import Axios from "axios";

// Vue.use(Axios)
// Vue.use(swal);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// window.axios = require('axios');
// const axios = require('axios');
// Vue.use(axios);
// const axios = require('axios').default;
import VueMask from 'v-mask'
Vue.use(VueMask);

new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app');
