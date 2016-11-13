var GithubAdapter = require('../common/GithubAdapter.js')
var githubUser = require('../api/githubAccount/model.js')
var _ = require('underscore')
var jwt = require('jsonwebtoken')

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

          githubUser
            .findOrCreate({
              where: {
                username: user.login,
                email: user.email
              },
              defaults: {
                accessToken: ghAdapter.accessToken
              }
            })
            .spread(
              function (ghUserDb, created) {
                // created is boolean
                var ghUser = ghUserDb.get({
                  plain: true
                })

                var microplanToken
                try  {
                  microplanToken = jwt.sign(
                    {
                      provider: 'github',
                      ghUserName: ghUser.username,
                      ghEmail: ghUser.email
                    },
                    req.app.get('jwtSecret')
                  )
                } catch (err) {
                  return res.render('error', {
                    error: 'Sorry, unable to generate a token for you.'
                  })
                }

                if (!microplanToken) {
                  return res.render('error', {
                    error: 'Sorry, unable to login.'
                  })
                }

                req.session.microplanToken = microplanToken
                return res.redirect('/')
              }
            )
        }
      )
    }
  )
}
