var db = require('../db');
var Promise = require('bluebird');
var _ = require('underscore');

var checkErr = function(err, callback) {
  if (err) {
    callback(err, null);
  }
  return err;
};

var messages = {
  get: function() {}, // a function which produces all the messages
  post: function(message, callback) {

    var insertQueryString = 'INSERT INTO messages (text, id_user, id_room) VALUES (?,?,?);';
    var queryArgs = [message.message, 1, 1];
    console.log(insertQueryString);
    db.query(insertQueryString, queryArgs, function(err, results) {
      checkErr(err, callback);
      callback(null, 'message inserted!');
    });
  }
};

var users = {
  get: function() {},
  post: function(userName, callback) {
    var insertQueryString = 'INSERT INTO users (name) VALUES (?);';
    users.getUserId(userName, function(err, results) {
      checkErr(err, callback);
      if (results) {
        callback(null, 'thats already in here man!');
      } else {
        db.query(insertQueryString, [userName], function(err, results) {
          if (err) {
            callback(err, null);
          }
          callback(null, 'user added to db.');
        });
      }
    });
  },

  getUserId: function(userName, callback) {
    var queryString = 'SELECT id FROM users WHERE name = ?;';
    db.query(queryString, [userName], function(err, results) {
      checkErr(err, callback)        
      if (results.length > 0) {
        callback(null, results[0].id);
      } else {
        callback(null, null);
      }
    });
  }
};

module.exports.messages = messages;
module.exports.users = {
  get: users.get,
  post: users.post
};