# CKEditor Plugins and Customizations

# Prerequisites
- Git command-line tools are installed. To do this you can either follow the installation steps on the git download homepage (https://git-scm.com/downloads) OR by following the instructions for GitHub Desktop (https://help.github.com/articles/set-up-git/). 
  Either one of these methods will install the git software and allow you to checkout and run the code. <b>For new users, the GitHub Desktop may be easier as it also comes with a UI that can help you visualize the process.</b>

- Node.js is installed. This tool is a widely popular javascript runtime that contains npm, which is a javascript-centric package manager. Npm is used in this project to manage the packages and run an embedded web server for testing.
  Installing Node.js can be done by following the steps at their homepage - https://nodejs.org/en/

# Installation steps
- Clone the repository to your local file system: 
```bash
git clone https://github.com/pinksummit/ckeditor.git
```
- Go into the newly created folder
```
cd ckeditor
```
- Use NPM to install the required javascript modules
```bash
npm i
```
- Use NPM to start up an embedded web server that can be used for live testing
```bash
npm start
```
<b>NOTE: Running `npm start` will automatically open up a window in your default browser once the web server is active. The web server is running in parallel to the background typescript compiler. On first load it may take 10-15 seconds until the typescript compiler is finished and the webpage shows up correctly in the browser window. Any future changes done to the source will be automatically updated in the browser.</b>
