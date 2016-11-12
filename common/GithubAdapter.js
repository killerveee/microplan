var superagent = require('superagent')

function GithubAdapter (accessToken) {
  this.accessToken = accessToken
}

GithubAdapter.authorize = function (opts, cb) {
  superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: opts.clientId,
      client_secret: opts.clientSecret,
      code: opts.code
    })
    .end(
      function (err, ghRes) {
        if (err || !ghRes.body) {
          return cb(err || 'response body empty', null)
        } else {
          return cb(null, new GithubAdapter(ghRes.body.access_token))
        }
      }
    )
}

GithubAdapter.prototype.getUser = function (cb) {
  superagent
    .get('https://api.github.com/user')
    .set('Authorization', 'token ' + this.accessToken)
    .end(
      function (err, user) {
        if (err || !user.body) {
          return cb(err || 'response body empty', null)
        } else {
          return cb(null, user.body)
        }
      }
    )
}

module.exports = GithubAdapter
