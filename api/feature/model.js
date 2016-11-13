var Sequelize = require('sequelize')

module.exports = global.sequelize.define('feature', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: Sequelize.STRING,
    allowsNull: false
  },
  provider: {
    type: Sequelize.STRING,
    allowsNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowsNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowsNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})
