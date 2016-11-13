var Sequelize = require('sequelize')

module.exports = function (cb) {
  global.sequelize = new Sequelize('postgres', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: console.log.bind(null, 'Sequelize:')
  })

  var githubAccount = require('../api/githubAccount/model.js')
  var githubIssue = require('../api/githubIssue/model.js')
  var feature = require('../api/feature/model.js')

  sequelize.sync().then(
    cb
  )
}
