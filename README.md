# hymnal-server

## Setup

After cloning the repository, you'll need to install all the necessary dependencies. To install them, navigate to the root app folder in a terminal and type `$ npm i`

This should run through all of the dependencies on the project, and download all of the necessary files for the application to actually work. 

You'll also want to get [Postman](https://getpostman.com) installed on your machine so that you can properly test the API when it's up and running, so go ahead and download that and set it up. Once Postman has finished setup, you're ready for the next step. 


## Connecting to Your MongoDB Instance

To connect to your MongoDB instance, replace the current connection URI by navigating to './config/index.js' and change 'process.env.MONGO_URI' your connection string for your database. 

## Running

To run, enter `npm start` into the terminal at project root. This command will run the *start* script shown in package.json. Assuming there are no errors, your app server is now running locally. Now, you can begin to test using Postman, and make sure that your API functions as you want it to. 

## Testing with Postman

