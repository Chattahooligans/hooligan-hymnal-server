var express = require('express');
var app = express();
var mongoose = require('mongoose');

var songController = require('./controllers/songController');
var notificationController = require('./controllers/notificationController');
var pushTokenController = require('./controllers/pushTokenController');

var port = process.env.PORT || 3000;
let MONGO_URI_STR = process.env.MONGO_URI;
let MONGO_URI = 'mongodb://hymnadmin:hooligans@ds151207.mlab.com:51207/chattahooliganhymnal'
console.log(process.env);

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(MONGO_URI_STR, { useMongoClient: true });

songController(app);
notificationController(app);
pushTokenController(app);

app.listen(port);
console.log('app listening on ' + port);
