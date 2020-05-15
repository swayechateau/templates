import Vue from 'vue'
import axios from 'axios'

const axiosConfig = {
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig)