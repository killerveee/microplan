module.exports = function (app, callback) {
  console.log('Setting app configs for appMode: prod')

  app.set('github.clientId', 'f015c77e2e3d595c7ad9')

  return callback()
}
