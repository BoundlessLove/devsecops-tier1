/*
Attempt was to use swagger to make the server independent. It failed, so I changed the port number and continued. 

Dependencies needed to validate the token:

a. express
b. cors
c. axios- gets details from the access token
d. express-jwt - extracts the token automatically from the authorisation header, as the bearer token.
e. jwks-rsa - uses json web key sets to provide token verification.

*/

const express = require('express'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors'); //required as API client on 3000 and API server on 4000.
//const jwt = require('express-jwt');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express(); 
const helloRoutes = require('./routes/hello');
//const port = process.env.PORT || 4000;
const port = 5000;
app.use('/',helloRoutes);
//swagger setup
const swaggerOptions = {
	swaggerDefinition: {
		myapi: '3.0.0',
		info: {
			title: 'Case Study Auth0',
			version: '1.0.0',
			description: 'API documentation',
		},
		servers: [
			{
				url: 'http://localhost:5000',
			},
		],
		//here
		components: { 
		 securitySchemes: { 
		   OAuth2: { 
		     type: 'oauth2', 
		     flows: { 
		       authorizationCode: { 
		         authorizationUrl: 'https://dev-5ytq8xlvrdmg2d03.us.auth0.com/authorize', 
		         tokenUrl: 'https://dev-5ytq8xlvrdmg2d03.us.auth0.com/oauth/token', 
		         scopes: { 
		           openid: 'Access your identity', 
		           profile: 'Access your profile', 
		         }, 
		       }, 
		     }, 
		   }, 
		 }, 
		}, 
		security: [{ OAuth2: ['openid', 'profile'] }],
	},
	apis: ['./server1.js','./routes/*.js'], //files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use( 
 '/api-docs', 
 swaggerUi.serve, 
 swaggerUi.setup(swaggerDocs, { 
   swaggerOptions: { 
     oauth: { 
       clientId: 'apombnwMiJWNICbzBmar3rxMt48XOwYr', 
       clientSecret: 'DCvTtzwbnqAyfPM8qYWl3kZc8a3A8pdDTjs8bYoIfRi4nUz63pAiPsx7141RX6lu', // Optional 
       //realm: 'your-realms', 
       appName: 'Swagger Auth0', 
       scopeSeparator: ' ', 
       scopes: "openid profile email offline_access",
       //additionalQueryStringParams: { test: 'hello' }, 
       useBasicAuthenticationWithAccessCodeGrant: true, 
       usePkceWithAuthorizationCodeGrant: true, 
     }, 
   }, 
 }) 
); 


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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a welcome message to anyone who visit site
 *     responses:
 *       200:
 *         description: Welcome message to one and all
 */
app.get('/', (req, res) => { 
  res.send('Hello from index route'); 
}); 

//app.get('/protected', jwtCheck, (req, res) => { 
//app.get('/protected', verifyJwt, (req, res) => { 


	/**
	 * @swagger
	 * /:
	 *   get:
	 *     summary: Verifies if authentication working
	 *     responses:
	 *       200:
	 *         description: If user authenticates, they get Welcome message
	 */	
	
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


/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifies if authentication and authorisation working
 *     responses:
 *       200:
 *         description: If user authenticates, then given they have authorisations,
 * 						they get Welcome message.
 */	

app.get('/topsecret', verifyJwt, (req, res) => {
  res.send('Hello from top secret.'); 
}); 


/**
 * @swagger
 * /hello/{name}:
 *   get:
 *     summary: Returns a greeting message
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name to greet
 *     responses:
 *       200:
 *         description: Greeting message
 */
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send({ greeting: `Hello, ${name}!` });
});

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
  //console.log("swagger spec URL: ", document.querySelector('#swagger-ui').dataset.spec);
}); 