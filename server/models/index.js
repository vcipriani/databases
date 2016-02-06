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
  post: function(roomName, callback) {
    insert('users', roomName, callback);
  }
};

var rooms = {
  get: function() {},
  post: function(roomName, callback) {
    insert('rooms', roomName, callback);
  }
};

var insert = function(table, name, callback) {
  var insertQueryString = 'INSERT INTO ' + table + ' (name) VALUES (?);';
  getId(table, name, function(err, results) {
    checkErr(err, callback);
    if (results) {
      callback(null, {
        id: results,
        status: name + ' found'
      });
    } else {
      db.query(insertQueryString, [name], function(err, results) {
        if (err) {
          callback(err, null);
        }
        callback(null, {
          id: results.insertId,
          status: name + ' added'
        });
      });
    }
  });
};

var getId = function(table, name, callback) {
  var queryString = 'SELECT id FROM ' + table + ' WHERE name = ?;';
  db.query(queryString, [name], function(err, results) {
    checkErr(err, callback);
    if (results.length > 0) {
      callback(null, results[0].id);
    } else {
      callback(null, null);
    }
  });
};



module.exports.messages = messages;
module.exports.rooms = rooms;
module.exports.users = users;