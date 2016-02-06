var models = require('../models');

models.users.post('ValVince', function(err, result) {
  console.log(err, result);
})