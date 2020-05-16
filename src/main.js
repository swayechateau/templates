import Vue from 'vue'
import router from './router'
import store from './state/store'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'

import 'sweetalert2/dist/sweetalert2.min.css'

import '@/components/_globals'
 
import axios from 'axios'
axios.defaults.baseURL = 'http://swaye.test/api';

Vue.use(VueSweetalert2);
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}