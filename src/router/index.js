import Vue from 'vue';
import Router from 'vue-router';
import store from './../store';

import Main from './../pages/Main';
import Contacts from "@/pages/Contacts";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      beforeEnter(to, from, next) {
        if (store.state.token) {
          next();
        } else {
          next();
        }
      },
      children: [
        { path: '/', component: Contacts}
      ]
    }
  ]
});
