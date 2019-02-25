import auth0Client from '@/services/AuthService'

export const state = () => ({
  isAuthenticated: false,
})

export const mutations = {
  SET_IS_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
}

export const actions = {
  initAuth({ commit }, req) {
    let isAuthenticated
    if (process.client) {
      isAuthenticated = auth0Client.clientAuth()
    } else {
      isAuthenticated = auth0Client.serverAuth(req)
    }
    commit('SET_IS_AUTHENTICATED', isAuthenticated)
  },
}
