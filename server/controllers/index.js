var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      res.end('the end (users get)');      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.end('the end (messages)');
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
      // if user is not already in the database (query the db to find this out)
        // insert req.body into the database
          // req.end(query results)
      // else
        // req.end("thats already in here man!")
      // close connection
      res.end('the end (users)');
      db.end();
    }
  }
};

