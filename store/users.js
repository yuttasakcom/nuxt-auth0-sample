import auth0Client from '@/services/AuthService'

export const state = () => ({
  isAuthenticated: false,
  user: null
})

export const mutations = {
  SET_IS_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  initAuth({ commit }, req) {
    let isAuthenticated
    let user = null

    if (process.client) {
      isAuthenticated = auth0Client.clientAuth()
      if (isAuthenticated) {
        user = auth0Client.clientUser()
      }
    } else {
      isAuthenticated = auth0Client.serverAuth(req)
      if (isAuthenticated) {
        user = auth0Client.serverUser(req)
      }
    }
    commit('SET_IS_AUTHENTICATED', isAuthenticated)
    commit('SET_USER', user)
  }
}
