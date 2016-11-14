var Model = require('./model.js')
var HttpStatus = require('http-status-codes')

module.exports = function (req, res) {
  req.checkBody('title', 'Invalid postparam').notEmpty()
  req.checkBody('description', 'Invalid description').notEmpty()
  req.checkBody('provider', 'Invalid provider').notEmpty()
  req.checkBody('userid', 'Invalid userid').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    res.send(errors).status(HttpStatus.BAD_REQUEST)
    return
  }

  var postData =
    {
      title: req.body.title,
      description: req.body.description,
      userid: req.body.userid,
      provider: req.body.provider
    }
  Model.create(postData).then(function (task) {
  // access the newly created task via the variable task
    res.send(task).status(HttpStatus.OK)
  })
}
