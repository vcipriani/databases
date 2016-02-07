var models = require('../models');

// models.users.post('magos', function(err, result) {
//   console.log(err, result.id);
// });

// models.rooms.post('my house', function(err, result) {
//   console.log(err, result.name);
// });

var message = {
  message: 'caw caw!',
  username: 'bird',
  roomname: 'big cage'
};

models.messages.post(message, function(err, result) {
  console.log(err, result);
});
