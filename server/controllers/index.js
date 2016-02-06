var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      res.end('the end (users get)');      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // db.connect();
      // var queryString = 'SELECT name FROM messages WHERE name = \'' + req.body.username + '\';';
      // var insertQueryString = 'INSERT INTO users (name) VALUES (\'' + req.body.username + '\');';
      // console.log(insertQueryString);
      // var queryArgs = []; //['?','?','?','?','?'];
      // db.query(queryString, queryArgs, function(err, results) {
      //   if (results.length > 0) {
      //     res.end('thats already in here man!');
      //     db.end();
      //   } else {
      //     db.query(insertQueryString, queryArgs, function(err, results) {
      //       res.end('added the thing for you!');
      //       db.end();
      //     });
      //   }
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.end('the end (users get)');      
    },
    post: function (req, res) {
      // open connection
      db.connect();
      var queryString = 'SELECT name FROM users WHERE name = \'' + req.body.username + '\';';
      var insertQueryString = 'INSERT INTO users (name) VALUES (\'' + req.body.username + '\');';
      console.log(insertQueryString);
      var queryArgs = []; //['?','?','?','?','?'];
      db.query(queryString, queryArgs, function(err, results) {
        if (results.length > 0) {
          res.end('thats already in here man!');
          db.end();
        } else {
          db.query(insertQueryString, queryArgs, function(err, results) {
            res.end('added the thing for you!');
            db.end();
          });
        }
      });
    }
  }
};

// var handleUser = function(name) {
//   var id_user = getUser(name);
//   if (id_user === null) {
//     return null;
//   } else {
//     return addUser(name);
//   }
// };

// // possible other functions
// var getUser = function(name){
//   // if found in db
//     // return id
//   // else
//     // return null
// };
// var addUser = function(name){
//   // add the user
//   // return userId
// }; 