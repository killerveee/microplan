module.exports = function (req, res) {
  console.log('logging in with github')

  return res.render('app', {
    appName: 'microplan'
  })
}
