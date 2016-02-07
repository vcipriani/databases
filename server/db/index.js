var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'p', {
  host: 'localhost',
  dialect: 'mysql'
});

var Room = db.define('Room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
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
    references: 'users',
    referencesKey: 'id'
  },
  id_room: {
    type: Sequelize.INTEGER,
    references: 'rooms',
    referencesKey: 'id'
  }
});

db.sync();

module.exports.Room = Room;
module.exports.User = User;
module.exports.Message = Message;
