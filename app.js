var express = require('express');
var app = express();
var mongoose = require('mongoose');

var songController = require('./controllers/songController');
var playerController = require('./controllers/playerController');
var notificationController = require('./controllers/notificationController');
var pushTokenController = require('./controllers/pushTokenController');

var port = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(MONGO_URI, { useMongoClient: true });

songController(app);
playerController(app);
notificationController(app);
pushTokenController(app);

app.listen(port);
console.log('app listening on ' + port);
