var Sequelize = require('sequelize')

module.exports = function (cb) {
  global.sequelize = new Sequelize('microplan', 'microplan', 'vettiscene', {
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

  sequelize.sync().then(
    cb
  )
}
