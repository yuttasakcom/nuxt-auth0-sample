import auth0 from "auth0-js";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "yoyea.auth0.com",
      clientID: "XY6c15eEBcMPS6sa2oKd5yoUpEMNOH8d",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid"
    });

    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          console.log(err);
          reject();
        }
      });
    });
  }

  setSession(authResult) {
    console.log(authResult);
  }

  login() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth0();

export default auth0Client;
