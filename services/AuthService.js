import auth0 from 'auth0-js'
import Cookies from 'js-cookie'

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'yoyea.auth0.com',
      clientID: 'XY6c15eEBcMPS6sa2oKd5yoUpEMNOH8d',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid'
    })

    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.clientAuth = this.clientAuth.bind(this)
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          resolve()
        } else if (err) {
          console.log(err)
          reject()
        }
      })
    })
  }

  setSession(authResult) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    Cookies.set('user', authResult.idTokenPayload)
    Cookies.set('jwt', authResult.idToken)
    Cookies.set('expiresAt', expiresAt)
  }

  login() {
    this.auth0.authorize()
  }

  logout() {
    Cookies.remove('user')
    Cookies.remove('jwt')
    Cookies.remove('expiresAt')
    this.auth0.logout({
      returnTo: '',
      clientID: 'XY6c15eEBcMPS6sa2oKd5yoUpEMNOH8d'
    })
  }

  isAuthenticated() {
    const expiresAt = Cookies.getJSON('expiresAt')
    return new Date().getTime() < expiresAt
  }

  clientAuth() {
    return this.isAuthenticated()
  }

  serverAuth(req) {
    if (req.headers.cookie) {
      const expiresAtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expiresAt='))

      if (!expiresAtCookie) {
        return false
      }

      const expiresAt = expiresAtCookie.split('=')[1]

      return new Date().getTime() < expiresAt
    }

    return false
  }
}

const auth0Client = new Auth0()

export default auth0Client
