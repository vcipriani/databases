var models = require('../models');



module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.get(function(err, result) {
        if (err) {
          console.log(err);
        }
        res.status(200).send(result);
      });
    },
    post: function(req, res) {
      models.messages.post(req.body, function(err, result) {
        if (err) {
          console.log(err);
        }
        res.send(result);
      });
    }
  },

  users: {
    get: function(req, res) {
      res.end('the end (users get)');
    },
    post: function(req, res) {
      models.users.post(req.body.username, function(err, result) {
        if (err) {
          console.log(err);
        }
        res.send(result);
      });
    }
  }
};
