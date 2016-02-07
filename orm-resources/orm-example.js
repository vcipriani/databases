/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'p', {
  host: 'localhost',
  dialect: 'mysql'
});

console.log(typeof Sequelize, typeof undefined);
/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

var Room = db.define('Room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
});

var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

var Message = db.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },

  id_room: {
    type: Sequelize.INTEGER,
    references: {
      model: Room,
      key: 'id'
    }
  }
});


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().then(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({
    name: 'Jean Valjean'
  });
  newUser.save()
    .then(function() {
      // Retrieve objects from the database:
      User.findAll({
        where: {
          name: 'Jean Valjean'
        }
      })
      .then(function(users) {
        // This function is called back with an array of matches.
        for (var i = 0; i < users.length; i++) {
          console.log(users[i].name + ' exists');
        }
      });
    });
});

// Message.sync();