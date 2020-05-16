import Vue from 'vue'
import axios from 'axios'

let api
const baseURL = 'http://swaye.test/api'
const timeout = 30000

function setAuthToken (token) {
  let axiosConfig = {
    baseURL,
    timeout,
    headers: { 'Authorization': token ? 'Bearer ' + token : '' } 
  }
  api = axios.create(axiosConfig)
}

Vue.prototype.$axios = api

export {
  api,
  setAuthToken
}