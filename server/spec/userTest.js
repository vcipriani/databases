var models = require('../models');

models.users.post('bowser', function(err, result) {
  console.log(err, result);
});

models.rooms.post('castle', function(err, result) {
  console.log(err, result);
});

var message = {
  message: 'hellow!',
  username: 'mario',
  roomname: 'castle'
};

models.messages.post(message, function(err, result) {
  console.log(err, result);
});