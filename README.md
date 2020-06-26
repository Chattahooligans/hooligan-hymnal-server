# hymnal-server

## API Reference

You can find a reference on all of the methods and what they do [here](./API.md)

## Setup

Tools you'll need:

- git
- npm

If you're new to this, you can find more information [here](https://help.github.com/) and [here](https://gist.github.com/leommoore/4420860) for information on the basics of these tools.

Once that's done, [clone]() the repository and run the following command at project root:

`$ npm i`

Congrats, you just installed all of the needed dependencies for running the app. You're about 30% of the way to deploying this server app as-is.

You'll possibly also want to get [Postman](https://getpostman.com) installed on your machine so that you can properly test the API when it's up and running, so go ahead and download that and [set it up](https://www.getpostman.com/docs). Once Postman has finished setup, you're ready for the next step.

## Creating a MongoDB instance

We are using a platform called [mLab](https://mlab.com) to host our MongoDB collections, but anything you want to use is fine as long as it supports MongoDB. Either way, once your database is setup, you'll need to create users for that database. Minimally, you'll want one ID that has write permissions. Once your user is created, you'll be inserting the credentials you created into a connection string that was given to you. It should look something like what's below.

`mongodb://<db user ID>:<db user PW>@ds212345.mlab.com:12345/<database name>`

Now that you have a connection string, save it somewhere. You'll need this in the future.

## Connecting to Your MongoDB Instance

For local testing, you'll want to assign the variable `MONGO_URI` in `./app/js` your connection string . However, once you place your server on a hosting platform, you'll want to change this back to `MONGO_URI = process.env.MONGO_URI`, then create a config variable on your host called `MONGO_URI` and assign it your connection string. This prevents people from seeing the username and password to your MongoDB instance, and messing up your data.

## Running

To run, enter `npm start` into the terminal at project root. This command will run the _start_ script shown in package.json. Assuming there are no errors, your app server is now running locally. Now, you can begin to test using Postman, and make sure that your API functions as you want it to.

## Testing with Postman

[postman collections and notes incoming]

## Notes

Want to deploy a server like this easily? You don't even have to change any code as long as you can set up your own MongoDB instance. You can deploy to [Heroku](https://heroku.com) using the button below, and your server will be up and running in minutes.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
