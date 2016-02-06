var models = require('../models');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res);
      res.end('the end (users get)');      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.end('thats all folks!');
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.end('the end (users get)');      
    },
    post: function (req, res) {
      models.users.post(req.body.username, function(err, result) {
        if (err) { throw Error(err); }
        res.end(result);
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