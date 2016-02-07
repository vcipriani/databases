var db = require('../db');
var Promise = require('bluebird');
var _ = require('underscore');


var messages = {
  get: function(callback) {
    // var queryString = 'SELECT m.id, m.text, r.name as roomname, u.name as username FROM messages m inner join rooms r on r.id=m.id_room inner join users u on u.id=m.id_user;';
    // db.query(queryString, [], function(err, results) {
    //   checkErr(err, callback);
    //   if (results.length > 0) {
    //     callback(null, results);
    //   } else {
    //     callback(null, null);
    //   }
    // });
    // var query = {
    //   where: {
    //     name: userName
    //   }
    // };
    db.Message.findAll().spread(function(messages) {
      console.log('23?')
      callback(messages[0]);
    });
      // .findOrCreate(query)
      // .spread(function(user) { //, created) {
      //   callback(null, user);
      // });
  }, // a function which produces all the messages
  post: function(message, callback) {
    var userQuery = {
      where: {
        name: message.username
      }
    };

    var roomQuery = {
      where: {
        name: message.roomname
      }
    };

    var userPromise = db.User
      .findOrCreate(userQuery)
      .spread(function(user) {
        return user;
        // return new Promise(user);
      });

    var roomPromise = db.Room
      .findOrCreate(roomQuery)
      .spread(function(room) {
        return room;
        // return new Promise(room);
      });

    Promise.all([userPromise, roomPromise])
    .then(function(valuesArray) {
      db.Message
      .build({
        text: message.message,
        id_user: valuesArray[0].id,
        id_room: valuesArray[1].id
      })
      .save();
    });
  }
};

var users = {
  get: function(userName, callback) {},
  post: function(userName, callback) {
    var query = {
      where: {
        name: userName
      }
    };
    db.User
      .findOrCreate(query)
      .spread(function(user) { //, created) {
        callback(null, user);
      });
  }
};

var rooms = {
  get: function() {},
  post: function(roomName, callback) {
    var query = {
      where: {
        name: roomName
      }
    };
    db.Room
      .findOrCreate(query)
      .spread(function(room) { //, created) {
        callback(null, room);
      });
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