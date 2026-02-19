# Versions

## Purpose of code
Modern Implementation of OAuth using help from Mr. Mittal (Mafia Codes, 2021, Mar, 28). 

SERVER REPO NAME IN GITHUB: items4sale-api
SERVER DOMAIN NAME, HOSTED ON FASTCOMET: https://devapiserver.systematicdefence.tech
FASTCOMET FOLDER NAME: Devapiserver

CLIENT REPO SELF NAME IN GITHUB: webstore
CLIENT DOMAIN NAME, HOSTED ON FASTCOMET: https://webstore.systematicdefence.tech
FASTCOMET FOLDER NAME: Dev 

Note: After every change made to github:

***Use Cpanel Git repo to update from remote and run deployment tasks***

## Curly Fastcomet React App Setup  ##

The application uses react technology, and is a single page application (SPA) for simplicity. It is sitting on Github, from where I push changes to fastcomet. Whenever manually push changes to code upto Github, and then pull the changes back down to Fastcomet, none of that applies to the react web application.

This occurs because first NPM build command needs to be run. Is there a build task to happen in an automated manner, when the code is pulled in fastcomet, like via a triggered YAML file I wondered. 

Answer: There are three ways- Github action, Post-pull hook on Fastcommet with SSH key use, and Fastcomet's Git Version Control with Deployment script. The latter one suits me most as it is the shorted perceived route, at this time. See Appendix 1.0 for rationale. Basically, the deployment script is a .yml file called .cpanel.yml, and it is driven by a button in Cpanel Git repo. Cpanel git repo also has a button for updating repo from remote. Idea is that both will be run at the same time. In the end it did not work, and I just manually ran 'npm install' and 'npm run build' on workstation and commited them into GitHub.



### Major Versions 

#### Version 0.0
##### Version 0.1 
06 October Midnight plus: Completed about half of tutorial
##### Version 0.2 
12 October 22:15 pm: Completed Tutorial
##### Version 0.3
14 October 17:49 pm: Client application now printing result to application 
##### Version 0.4
14 October 10:25 pm: The server now prints result based on user's permissions. See Documents\Cyber Ethical Hacking\Webhosting\transfer\MoveAuth0AppToPhp3Oct2025.doc for screenshots. 
##### Version 0.5
13 Feb 2026 14:00: Logging has been applied to API Server. All four APIs functional.
##### Version 0.6
14 Feb 2026 15:47: When a new user is registered, automatically a stripe account for them is created. Product has been created and a start has been made for the flow for buying api. Finally, when a person logs in, now their unique email address is shown on the page. 
##### Version 0.7
16 Feb 2026 14:12: Move to https://www.webstore.systematicdefence.tech completed successfully. React Website's UI components rendering properly. All code is in repositories in Github. In this release, Uudated API server references to match the Dev Server environment, so APIs from hyper-v test environment that had broken after migration, can start working again.
##### Version 0.7.1
16 Feb 2026 14:51: Added fastcomet folder name, which is connected to Github, for server and client. There are three branches- local (hyper-v environment on local workstation), dev (self) and master(Production). 
##### Version 0.8
16 Feb 2026 14:51: Deployment yml added to manage deployment tasks after cpanel git update.
##### Version 0.8.1
16 Feb 2026 18:00: Fixed problems in .cpanel.yml yml syntax.
##### Version 0.8.2
16 Feb 2026 18:41: There is no node or npm on fastcomet. Hence, setup a node project and connected deployment yaml to use its bin folder for executing npm install and npm build.
##### Version 0.8.3
16 Feb 2026 18:54: To the .cpanel.yml, added command to restart. This code will be pulled into live environment. 
##### Version 0.9
19 Feb 2026 13:57: Troubleshooting to get the page to render again. I pulled in version 0.8.3 into live environment. The button to run the .cpanel.yml deployment script did not work and the react app stopped rendering. So, I did those steps in .cpanel.yml manually for now, and pulled code up again. The app still did not render. While troubleshooting I realised that in my fastcomet repo, I had a .htaccess file, which was overwritten when I pulled up the code, i.e. there is no .htaccess file in this repo. So version 0.9 has the .htaccess file.

##### Version 0.10 
19 Feb 2026 18:14: Added capability to run code on local machine via adding .env.production and .env.development files, and updating app.js accordingly. Confirmed as working in development /'local PC' environment. Need to write code that will do the .cpanel.yml work locally in an automated fashion.

##### Version 0.11
20 Feb 2026 07:47: Added capability in scripts section of project.json to move build folder output to project root after build completed via command  "build": "react-scripts build && npm run move-build". What "move-build" does:
a. Remove the old static folder: rm -rf ./static
b.  Copy the new static folder into the root: cp -r ./build/static ./
c. Copy only the top level files from build: cp -r ./build/*.* ./

##### Version 0.11.01
20 Feb 2026 08:00: [NOT IMPLEMENTED] I did think about pushing code to github via the project.json scripts section, the ideal state. This can be handled at a later date. It requires a seamless connection to github from the PC hosting the development instance of the repository. In particular, setting a SSH connection to Github repo via  "git remote set-url origin git@github.com:username/repo.git". This would require Github to be setup to take passwordless authentication from the local server.
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "git add . && git commit -m 'Deploy' && git push && ssh user@server 'rm -rf /home/<user>/public_html/*' && rsync -avz ./build/ user@server:/home/<user>/public_html/"
  }
}

Here’s the timeline:
1. Creates a fresh  folder locally.
2. Adds only source files (because  is in ).
3. Commits your source code changes.
4. Pushes your source code to GitHub via SSH.
5. Clears the server’s root folder.
6. Uploads the contents of the build folder to the server root.

##### Version 0.12
20 Feb 2026 10:21: Added capability to self deploy to Github. Following command was run to force Git to use Windows OpenSSH: 
- git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
Test SSH connection using:
- git ls-remote git@github.com:BoundlessLove/webstore.git



##APPENDIX 1.0##
You’re absolutely right about the root cause: FastComet is serving your built React app, so pulling new code from GitHub won’t change anything until you run: 

npm install 
npm run build 
 

The good news is that you can automate this — but the exact method depends on how your FastComet hosting is set up. Let me walk you through the realistic options and the one that usually works best. 

 

⭐ The Short Answer 

Yes — you can automate the build step, but FastComet does not automatically run build commands on git pull. You must set up one of these: 

Option A — Use GitHub Actions to build and deploy the built files 

(Recommended — avoids needing Node on FastComet) 

Option B — Use a post‑pull hook on FastComet (if SSH access is available) 

A script that runs automatically after you pull. 

Option C — Use cPanel’s Git Version Control + Deployment Script 

FastComet supports this, and it’s the easiest if you want automation on the server. 

 

🟦 Option A — GitHub Actions (Best for React apps) 

Instead of building on FastComet, you build on GitHub and deploy the build/ folder to FastComet via FTP or SFTP. 

Example GitHub Actions workflow (deploy.yml) 

This runs automatically whenever you push to main: 

------

name: Deploy React App 
 
on: 
 push: 
   branches: [ "main" ] 
 
jobs: 
 build: 
   runs-on: ubuntu-latest 
 
   steps: 
     - uses: actions/checkout@v3 
 
     - name: Install dependencies 
       run: npm install 
 
     - name: Build React app 
       run: npm run build 
 
     - name: Deploy to FastComet via SFTP 
       uses: wlixcc/SFTP-Deploy-Action@v1.2.4 
       with: 
         server: ${{ secrets.FASTCOMET_HOST }} 
         username: ${{ secrets.FASTCOMET_USER }} 
         password: ${{ secrets.FASTCOMET_PASS }} 
         local_path: "./build/*" 
         remote_path: "/public_html/" 
 
-----
This way: 

GitHub builds your app 

Only the final static files are uploaded 

FastComet doesn’t need Node, npm, or build tools 

This is the cleanest and most reliable setup. 

 

🟩 Option B — Post‑pull hook on FastComet (if using SSH) 

If you SSH into FastComet and run git pull manually, you can automate the build by adding a post-merge hook. 

Inside your repo on FastComet: 

cd /path/to/your/repo/.git/hooks 
nano post-merge 
 

Add: 

 #!/bin/bash 
cd /path/to/your/app 
npm install 
npm run build 
 

Then: 

chmod +x post-merge 
 

Now every time you run git pull, the build happens automatically. 

 

🟧 Option C — cPanel Git Deployment Script (FastComet supports this) 

If you created your repo inside cPanel → Git Version Control, you can attach a deployment script. 

In cPanel: 

Pre-req: Run command to enable creation of new folder for dev: 'mv dev dev_old'

Go to Git Version Control 

Select your repo 

Click Manage 

Add a Deployment Script 

Example script: 

 #!/bin/bash 
cd /home/youruser/repo 
npm install 
npm run build 
cp -r build/* /home/youruser/public_html/ 
 

Now every time you click Pull, cPanel runs the script. 

 

🟦 Which option should you use? 

If your React app is a typical static site (SPA), then: 

✔ Use GitHub Actions if: 

You want true automation 

You don’t want Node installed on FastComet 

You want clean CI/CD 

✔ Use cPanel Deployment Script if: 

You prefer building on the server 

You use cPanel’s Git integration 

✔ Use post-merge hook if: 

You SSH into FastComet and run git pull manually 

 

If you want, I can generate the exact YAML file or deployment script tailored to: 

Your repo name 

Your FastComet folder structure 

Whether you use FTP, SFTP, or cPanel Git 

Just tell me how your FastComet environment is set up. 

 


##REFERENCES##
1. Mafia Codes.(2021, Mar, 28). YouTube- Auth0 authentication in Reactjs using OAuth2. <url> 