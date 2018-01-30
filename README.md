# hymnal-server

## Setup

After cloning the repository, you'll need to install all the necessary dependencies. To install them, navigate to the root app folder in a terminal and type

> `$ npm i`

This should run through all of the dependencies on the project, and download all of the necessary files for the application to actually work. 

You'll also want to get [Postman](https://getpostman.com) installed on your machine so that you can properly test the API when it's up and running, so go ahead and download that and set it up. Once Postman has finished setup, you're ready for the next step. 


## Connecting to Your MongoDB Instance

This app is setup to connect to a MongoDB instance, and replacing the built in connection URI is simple. Simply navigate to './config/index.js' and find the default connection URI 

## Running

To run, enter

> `node app.js`
