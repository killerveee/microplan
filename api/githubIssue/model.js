var Sequelize = require('sequelize')

module.exports = global.sequelize.define('githubIssue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowsNull: false
  },
  reponame: {
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
  },
  accessToken: {
    type: Sequelize.STRING,
    allowsNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})
