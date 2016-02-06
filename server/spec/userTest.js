var models = require('../models');

models.users.post('Prince Ali', function(err, result){
  console.log(err, result);
})