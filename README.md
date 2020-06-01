# STEMChat
A light weight progressive web app Client to work with metastudio.org server.

This project uses Pure CSS, a tiny Css library to make page beautiful and responsive.  
package.json has the required dependencies. Use npm install to install all the required modules.

 - git clone the project
 - Make sure you have Node.js installed
 - Using the terminal/command line, navigate to this directory
 - Run 'npm install' on the command line to install required dependencies as mentioned in packasge.json
 - Add a secrets.js in the root or main directory/folder.
 - Run 'node app.js' on the command line.
 - Open the browser and type 'http://localhost:3000/' to test the app. 
 
The App does nothing as yet, just some barebones! 

Note secrets.js should have the following code:-

const API_KEY='YOUR API KEY GOES HERE';
const URL='YOUR API ENDPOINT GOES HERE';
const long_string='A SECRET LONG STRING GOES HERE';
module.exports.key=API_KEY;
module.exports.url=URL;
module.exports.string=long_string;
