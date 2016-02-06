var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userName, callback) {
      // open connection
      db.connect();
      var queryString = 'SELECT name FROM users WHERE name = \'' + userName + '\';';
      var insertQueryString = 'INSERT INTO users (name) VALUES (\'' + userName + '\');';
      console.log(insertQueryString);
      var queryArgs = []; //['?','?','?','?','?'];
      db.query(queryString, queryArgs, function(err, results) {
        if (err) { callback(err, null); }
        if (results.length > 0) {
          callback(null, 'thats already in here man!');
          db.end();
        } else {
          db.query(insertQueryString, queryArgs, function(err, results) {
            callback(null, 'user added to db.');
            db.end();
          });
        }
      });
    }
  }
};

