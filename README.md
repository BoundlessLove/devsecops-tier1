$${\color{red} © \space 2026 \space Jyotirmay \space Sarna. \space This \space work \space is \space original. \space Do \space not \space copy, \space repost, \space or \space use \space without \space permission. }$$

# Versions

## Purpose of code ##
Basics of Entry into Test Automation using react and node.js

Right now the client and server are optimised to run for DevSecOps and Test Driven Developoment (TDD). To run client and server locally, do the following:

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

#### Version 1.1
26 March 2026: fixed issue with API_Key variable not being read. It was just that it refers to .env.test and it took me time to understand that.

#### Version 1.2
Fix the ci-keyvault.yml by giving secret retrieval step an id, and using it to refer to the secret. Also, update the ci-keyvault.yml's 'injecting API key into test environment' step to overwrite the REACT_APP_API_KEY variable, rather than append.

## NEXT STEPS ##
Implement Concordian for Test Driven Developoment (TDD).

$${\color{red} © \space 2026 \space Jyotirmay \space Sarna. \space This \space work \space is \space original. \space Do \space not \space copy, \space repost, \space or \space use \space without \space permission. }$$
