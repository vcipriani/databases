var db = require('../db');
var Promise = require('bluebird');
var _ = require('underscore');


var messages = {
  get: function(callback) {
    // ???????????????????????????????????????????????????????????????????????????????????
    var queryString = 'SELECT m.*, r.name as roomname FROM messages m inner join rooms r on r.id=m.id_room;';
    db.query(queryString, [], function(err, results) {
      checkErr(err, callback);
      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, null);
      }
    });
  }, // a function which produces all the messages
  post: function(message, callback) {
    insertOrGetExisting('users', {
      name: message.username
    }, function(err, results) {
      checkErr(err, console.log);
      if (results) {
        var userId = results.id;
        insertOrGetExisting('rooms', {
          name: message.roomname
        }, function(err, results) {
          checkErr(err, console.log);
          var roomId = results.id;
          if (results) {
            var insertObj = {
              text: message.message,
              id_user: userId,
              id_room: roomId
            };
            insert('messages', insertObj, function(err, result) {
              checkErr(err, callback);
              if (result) {
                callback(null, insertObj);
              }
            });
          }
        });
      }
    });
  }
};

var users = {
  get: function(userName, callback) {},
  post: function(userName, callback) {
    insertOrGetExisting('users', {
      name: userName
    }, callback);
  }
};

var rooms = {
  get: function() {},
  post: function(roomName, callback) {
    insertOrGetExisting('rooms', {
      name: roomName
    }, callback);
  }
};

var insertOrGetExisting = function(table, propObj, callback) {
  getId(table, propObj.name, function(err, results) {
    checkErr(err, callback);
    if (results) {
      callback(null, {
        id: results,
        status: JSON.stringify(propObj) + ' found'
      });
    } else {
      insert(table, propObj, callback);
    }
  });
};

var insert = function(table, propObj, callback) {
  var insertQueryString = 'INSERT INTO ' + table + ' SET ?;';
  db.query(insertQueryString, propObj, function(err, results) {
    if (err) {
      callback(err, null);
    }
    callback(null, {
      id: results.insertId,
      status: JSON.stringify(propObj) + ' added'
    });
  });
};

var checkErr = function(err, callback) {
  if (err) {
    callback(err, null);
  }
  return err;
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