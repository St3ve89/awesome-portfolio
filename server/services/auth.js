const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// MIDDLEWARE
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinutes: 15,
    jwksUri: 'https://dev-1cnzle42.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'nwDpGURZPVEb70PsoPcu4VIjP6DzQrNr',
  issuer: 'https://dev-1cnzle42.eu.auth0.com/',
  algorithms: ['RS256']
})

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if(user && (user[`${process.env.NAMESPACE}/role`] === role)) {
    next();
  } else {
    return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access to this data'})
  }
}