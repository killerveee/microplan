module.exports = function (app, callback) {
  console.log('Setting app configs for appMode: dev')

  app.set('github.clientId', '02720af33a162cd0cf8f')
  app.set('github.clientSecret', '6ea55129a9e369401aa24b35637f174a006dd5fd')

  return callback(app)
}
