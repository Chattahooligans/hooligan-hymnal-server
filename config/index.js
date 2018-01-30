var configValues = require('./config');

module.exports = {
  getDbConnectionString: function() {
    return (
      'mongodb://hymnadmin:hooligans@ds151207.mlab.com:51207/chattahooliganhymnal'
    );
  }
};
