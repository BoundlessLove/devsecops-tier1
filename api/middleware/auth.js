//middleware/auth.js
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');


const verifyJwt = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-5ytq8xlvrdmg2d03.us.auth0.com/.well-known/jwks.json',
	}), 
	audience: 'this is a unique identifier',
	issuer: 'https://dev-5ytq8xlvrdmg2d03.us.auth0.com/',
	algorithms: ['RS256'],
}).unless({ path: ['/'] });

module.exports = verifyJwt;
