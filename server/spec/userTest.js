var models = require('../models');

models.users.post('Puppy', function(err, result) {
  console.log(err, result);
});

models.rooms.post('jungle', function(err, result) {
  console.log(err, result);
});