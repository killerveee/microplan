var GithubAdapter = require('../common/GithubAdapter.js')

module.exports = function (req, res) {
  console.log('logging in with github')

  GithubAdapter.authorize(
    {
      clientId: req.app.get('github.clientId'),
      clientSecret: req.app.get('github.clientSecret'),
      code: req.query.code
    },
    function (err, ghAdapter) {
      if (err || !ghAdapter) {
        return res.render('error', {
          error: 'Unable to login into github.'
        })
      }

      ghAdapter.getUser(
        function (err, user) {
          if (err || !user) {
            return res.render('error', {
              error: 'Unable to fetch user data from github: ' + err
            })
          }

          return res.render('app', {
            appName: JSON.stringify(user)
          })
        }
      )
    }
  )
}
