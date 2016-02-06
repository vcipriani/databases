var models = require('../models');

// models.users.post('dj khaled', function(err, result) {
//   console.log(err, result);
// });

// models.rooms.post('path to great success', function(err, result) {
//   console.log(err, result);
// });

var message = {
  message: 'Another One',
  username: 'dj khaled',
  roomname: 'path to great success'
};

models.messages.post(message, function(err, result) {
  console.log(err, result);
});