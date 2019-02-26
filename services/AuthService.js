import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

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
    this.clientAuth = this.clientAuth.bind(this)
    this.serverAuth = this.serverAuth.bind(this)
    this.verifyToken = this.verifyToken.bind(this)
    this.serverGetToken = this.serverGetToken.bind(this)
    this.clientUser = this.clientUser.bind(this)
    this.serverUser = this.serverUser.bind(this)
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

  clientAuth() {
    const token = Cookies.getJSON('jwt')
    const verifiedToken = this.verifyToken(token)

    return verifiedToken
  }

  serverGetToken(req) {
    if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))

      if (!tokenCookie) {
        return false
      }

      const token = tokenCookie.split('=')[1]

      return token
    }

    return false
  }

  serverAuth(req) {
    if (req) {
      const token = this.serverGetToken(req)
      const verifiedToken = this.verifyToken(token)
      return verifiedToken
    }

    return false
  }

  verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token)
      const expiresAt = decodedToken.exp * 1000
      return decodedToken && new Date().getTime() < expiresAt ? true : false
    }

    return false
  }

  clientUser() {
    const token = Cookies.getJSON('jwt')
    const decodedToken = jwt.decode(token)
    return decodedToken
  }

  serverUser(req) {
    const token = this.serverGetToken(req)
    const decodedToken = jwt.decode(token)
    return decodedToken
  }
}

const auth0Client = new Auth0()

export default auth0Client
