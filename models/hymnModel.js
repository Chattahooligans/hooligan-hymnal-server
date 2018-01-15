var mongoose = require('mongoose');

mongoose.connect('mongodb://hymnadmin:hooligans@ds151207.mlab.com:51207/chattahooliganhymnal')

var Schema = mongoose.Schema;

var hymnSchema = new Schema({
  title: String,
  lyrics: String
});

var Hymns = mongoose.model('Hymns', hymnSchema);

module.exports = Hymns;