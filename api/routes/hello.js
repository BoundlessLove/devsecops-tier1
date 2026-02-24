// routes/hello.js

// Sample user list (in-memory JSON)
const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/auth');
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *               items:
 *                type: object
 *                properties:
 * 	               id:
 *                  type: integer
 *                  example: 1
 *                 name:
 *                  type: string
 *                  example: John Doe
 */

 router.get('/users/all', verifyJwt, (req, res) => {
  res.json(users);
 });
 
 /**
  * @swagger
  * /users/{name}:
  *   get:
  *     summary: Returns user details, if user's name is correct
  *     parameters:
  *       - in: path
  *         name: name
  *         schema:
  *           type: string
  *         required: true
  *         description: Name to get detail of
  *     responses:
  *       200:
  *         description: User's details
  */
 // Route to get a user by name (case-insensitive)
 router.get('/users/:name', verifyJwt, (req, res) => {
	const permissions = req.auth?.permissions || [];
	//res.json( {permissions} );
	if (!permissions.includes('read:users')){
		//return permissions;
		return res.status(403).json({ message: 'Viewing database data is Forbidden.'});
		//return false;
	}
	const name = req.params.name.toLowerCase();
   const user = users.find(u => u.name.toLowerCase() === name);

   if (user) {
     res.json(user);
   } else {
     res.status(404).json({ message: 'User not found' });
   }
 });
 
 module.exports = router; // export router, so it can be used in the main server file.
