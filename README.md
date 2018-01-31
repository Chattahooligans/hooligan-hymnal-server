# hymnal-server

## Setup

After cloning the repository, you'll need to install all the necessary dependencies. To install them, navigate to the root app folder in a terminal and type `$ npm i`

This should run through all of the dependencies on the project, and download all of the necessary files for the application to actually work. 

You'll also want to get [Postman](https://getpostman.com) installed on your machine so that you can properly test the API when it's up and running, so go ahead and download that and set it up. Once Postman has finished setup, you're ready for the next step. 

## Creating a MongoDB instance

## Connecting to Your MongoDB Instance

For local testing, you'll want to assign the variable `MONGO_URI` in `./app/js` your connection string . However, once you place your server on a hosting platform, you'll want to change this back to `MONGO_URI = process.env.MONGO_URI`, then create a config variable on your host called `MONGO_URI` and assign it your connection string. This prevents people from seeing the username and password to your MongoDB instance, and messing up your data.  

## Running

To run, enter `npm start` into the terminal at project root. This command will run the *start* script shown in package.json. Assuming there are no errors, your app server is now running locally. Now, you can begin to test using Postman, and make sure that your API functions as you want it to. 

## Testing with Postman



## Notes

Want to deploy a server like this easily? You don't even have to change any code as long as you can set up your own MongoDB instance. You can deploy to [Heroku](https://heroku.com) using the button below, and your server will be up and running in minutes. 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)