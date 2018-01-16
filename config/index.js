var configValues = require('./config');

module.exports = {

  getDbConnectionString: function () {
return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds151207.mlab.com:51207/chattahooliganhymnal';
  }

}