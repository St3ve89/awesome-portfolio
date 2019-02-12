import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

class Auth0 {

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-1cnzle42.eu.auth0.com',
      clientID: 'nwDpGURZPVEb70PsoPcu4VIjP6DzQrNr',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    debugger;
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err)
          console.log(err);
        }
      });
    })
  }

  setSession(authResult) {
    debugger;
    // Set isLoggedIn flag in localStorage
    // localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    // this.accessToken = authResult.accessToken;

    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);

  }

  logout() {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    this.auth0.logout({
      returnTo: '',
      clientID: 'nwDpGURZPVEb70PsoPcu4VIjP6DzQrNr'
    })
  }

  login() {
    this.auth0.authorize();
  }

  isAuthenticated() {
    const expiresAt = Cookies.getJSON('expiresAt')
    return new Date().getTime() < expiresAt;
  }

  verifyToken(token) {
    if(token) {
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp * 1000;

      return (decodedToken && new Date().getTime() < expiresAt) ? decodedToken : undefined;
    }

    return undefined;
  }

  clientAuth() {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = this.verifyToken(token);

    return verifiedToken
  }

  serverAuth(req) {
    if(req.headers.cookie) {
      const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));

      if(!tokenCookie) {
        return undefined
      };

      const token = tokenCookie.split('=')[1];
      const verifiedToken = this.verifyToken(token);


      return verifiedToken;
    }

    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;