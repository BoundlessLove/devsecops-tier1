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
const { auth } = require('express-oauth2-jwt-bearer');

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
}).unless({ path: ['/'] });

const jwtCheck = auth({ 
 audience: 'this is a unique identifier', 
 issuerBaseURL: 'https://dev-5ytq8xlvrdmg2d03.us.auth0.com/', 
 tokenSigningAlg: 'RS256' 
});
  
//app.use(jwtCheck);
//app.use(verifyJwt);


app.get('/', (req, res) => { 

  res.send('Hello from index route'); 

}); 

//app.get('/protected', jwtCheck, (req, res) => { 
//app.get('/protected', verifyJwt, (req, res) => { 
app.get('/protected', verifyJwt, async (req, res) => {
//  res.send('Hello from protected route'); 
  //res.send(req.user);
  try {
	const accessToken = req.headers.authorization.split(' ')[1];
	const response = await axios.get('https://dev-5ytq8xlvrdmg2d03.us.auth0.com/userinfo', {
		headers: {
			authorization: `Bearer ${accessToken}`
		}	
	});
	const userinfo = response.data
	console.log(userinfo);
	res.send(userinfo);  
  } catch (error) {
		res.send(error.message)
  }

}); 

app.get('/topsecret', verifyJwt, (req, res) => {
  res.send('Hello from top secret.'); 
}); 

//app.get()

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
//  res.status().send()	
	const status = error.status || 500;
	const message = error.message || 'Internal server error';
	req.status(status).send(message);
});

app.listen(port,() => { 

  console.log(`API running at http://localhost:${port}`); 

}); 