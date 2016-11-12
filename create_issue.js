var createIssue = require('github-create-issue')

module.exports = function (req, res) {
  var opts = {
    'token': req.body.accessToken,
    'body': req.body.description
  }

  createIssue(req.body.username + '/' + req.body.reponame, req.body.title, opts, clbk)
  function clbk (error, issue, info) {
    // Check for rate limit information...
    if (info) {
      console.error('Limit:%d', info.limit)
      console.error('Remaining: %d', info.remaining)
      console.error('Reset: %s', (new Date(info.reset * 1000)).toISOString())
    }
    if (error) {
      throw new Error(error.message)
    }
    console.log(JSON.stringify(issue))
    return res.send(JSON.stringify(issue))
  }
}
