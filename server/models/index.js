var db = require('../db');
var Promise = require('bluebird');
var _ = require('underscore');

// db.connect(); // done in /db/index.js

module.exports = {
  messages: {
    get: function() {}, // a function which produces all the messages
    post: function(message, callback) {
      var insertQueryString = 'INSERT INTO messages (text, id_user, id_room) VALUES (?,?,?);';
      var queryArgs = [message.message, 6, 1];
      console.log(insertQueryString);
      db.query(insertQueryString, queryArgs, function(err, results) {
        if (err) {
          callback(err, null);
        }
        callback(null, 'message inserted!');
      });
    }
  },

  users: {
    get: function() {},
    post: function(userName, callback) {
      var queryString = 'SELECT name FROM users WHERE name = ?;';
      var insertQueryString = 'INSERT INTO users (name) VALUES (?);';
      var queryArgs = [userName];
      db.query(queryString, queryArgs, function(err, results) {
        if (err) {
          callback(err, null);
        }
        if (results.length > 0) {
          callback(null, 'thats already in here man!');
        } else {
          db.query(insertQueryString, queryArgs, function(err, results) {
            callback(null, 'user added to db.');
          });
        }
      });
    }
  }
};
