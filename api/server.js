/*
Dependencies needed to validate the token:

a. express
b. cors
c. axios- gets details from the access token
d. express-jwt - extracts the token automatically from the authorisation header, as the bearer token.
e. jwks-rsa - uses json web key sets to provide token verification.

*/

const express = require('express'); 

const cors = require('cors'); //required as API client on 3000 and API server on 4000.
//const jwt = require('express-jwt');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');


const app = express(); 

const port = 4000; 
//const port = 5000; 

/*const corsOptions = { 

  origin: 'http://localhost:4000', // or whatever your frontend port is 

  methods: ['GET', 'POST', 'OPTIONS'], 

  allowedHeaders: ['Content-Type', 'Authorization'], 

  credentials: true 

};

app.use(cors(corsOptions));
app.options('x', cors(corsOptions)); // Handle preflight
*/
app.use(cors());
//middleware
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
})
  
//app.use(verifyJwt);

app.get('/', (req, res) => { 

  res.send('Hello from index route'); 

}); 

app.get('/protected', (req, res) => { 

  res.send('Hello from protected route'); 

}); 
  

app.listen(port,() => { 

  console.log(`API running at http://localhost:${port}`); 

}); 