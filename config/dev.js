module.exports = function (app, callback) {
  console.log('Setting app configs for appMode: dev')

  app.set('github.clientId', '02720af33a162cd0cf8f')

  return callback(app)
}
