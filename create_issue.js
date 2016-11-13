var createIssue = require('github-create-issue')
var opts = {
  'token': '2f772356f17500ceefdbf855c3751d00d0b6caa5',
  'body': 'Description'
}

createIssue('argonlaser/test', 'Title', opts, clbk)
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
  // returns <issue_data>
}
