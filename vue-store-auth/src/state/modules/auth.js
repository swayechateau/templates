import { api, setAuthToken } from '@/utils/api'
import { getSavedState, saveState } from '@/utils/local-storage'
export const state = {
  currentUser: getSavedState('auth.currentUser'),
  token: getSavedState('auth.token'),
  user: getSavedState('auth.user'),
  impersonate: false,
}

export const mutations = {
  SET_AUTH_TOKEN(state, newValue) {
    state.token = newValue
    saveState('auth.token', newValue)
    setDefaultAuthHeaders(state)
  },
  SET_AUTH_USER(state, newValue) {
    state.user = newValue
    saveState('auth.user', newValue)
  },
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.token
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return api
      .post('/auth/login', { email, password })
      .then(response => {
        const token = response.data
        commit('SET_AUTH_TOKEN', token)
        // dispatch('setUser', token)
        return token
      })
  },

  // Logs out the current user.
  logOut({ commit, state }) {
    if (!state.impersonate){
      commit('SET_AUTH_TOKEN', null)
      commit('SET_AUTH_USER', null)
      commit('SET_CURRENT_USER', null)
    } else {
      commit('SET_CURRENT_USER', state.user)
    }
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.token) return Promise.resolve(null)
    return api
      .get('/auth/user')
      .then(response => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
  impersonate({ commit }) {
    // send off for user details
    return api
      .get('/api/auth/user')
      .then(response => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
  setUser({ commit, state }, { token }) {
    let access_token = token ? token : state.token.access_token
    return api
      .get('/api/auth/user', { headers: { 'Authorization': 'Bearer ' + access_token } })
      .then(response => {
        const user = response.data
        commit('SET_AUTH_USER', user)
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit('SET_AUTH_TOKEN', null)
          commit('SET_AUTH_USER', null)
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
}

// ===
// Private helpers
// ===

function setDefaultAuthHeaders (state) {
  setAuthToken(state.token.access_token)
}