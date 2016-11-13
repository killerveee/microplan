var Model = require('./model.js')
var HttpStatus = require('http-status-codes')

module.exports = function (req, res) {
  req.checkBody('title', 'Invalid postparam').notEmpty()
  req.checkBody('description', 'Invalid description').notEmpty()
  req.checkBody('username', 'Invalid username').notEmpty()
  req.checkBody('reponame', 'Invalid reponame').notEmpty()
  req.checkBody('accessToken', 'Invalid accessToken').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    res.send(errors).status(HttpStatus.BAD_REQUEST)
    return
  }

  var postData =
    {
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      reponame: req.body.reponame,
      accessToken: req.body.accessToken
    }
  Model.create(postData).then(function (task) {
  // access the newly created task via the variable task
    res.send(task).status(HttpStatus.OK)
  })
}
