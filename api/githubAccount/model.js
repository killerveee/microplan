var Sequelize = require('sequelize');

module.exports = global.sequelize.define('githubAccount', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowsNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowsNull: false
  },
  accessToken: {
    type: Sequelize.STRING,
    allowsNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
