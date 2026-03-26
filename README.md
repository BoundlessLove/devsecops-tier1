# Versions

## Purpose of code ##
Basics of Entry into Test Automation using react and node.js

Right now the client and server are optimised to run for DevSecOps. To run client and server locally, do the following:

1. Change the server/index.js to take the API key from dev variable:
- const serverKey = process.env.API_KEY_LOCAL;

2. Test
client: npm run test:dev
server: npm test

3. Run
client: npm start
server: npm start

## Metadata and identification information for code ##

### Major Versions 

#### Version 0.0
##### Version 0.1 
25 March 2026: Tests working in dev for client and server. ci.yaml not tested. Report type neeeds to be improved. 
##### Version 0.2
26 March 2026: Tests working in dev for client and server. ci.yaml operational. Report working nicely.

#### Version 1.0
26 March 2026: Tests working in dev for client and server. ci.yaml  tested. Report working for standard and API endpoint. Azure Keyvault used to get API KEY at runtime. 
