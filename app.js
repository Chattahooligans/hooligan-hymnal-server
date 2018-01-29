var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var songController = require('./controllers/songController');
var notificationController = require('./controllers/notificationController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString(), { useMongoClient: true });

songController(app);
notificationController(app);

app.listen(port);
console.log('app listening on ' + port);
