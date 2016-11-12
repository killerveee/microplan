module.exports = function (app, callback) {
  console.log('Setting app configs for appMode: prod')

  app.set('github.clientId', 'f015c77e2e3d595c7ad9')
  app.set('github.clientSecret', '0624bc9ffa059fe85b9d5b69eca724f5dab552a6')
  return callback(app)
}
