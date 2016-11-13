module.exports = function (req, res) {
  console.log('logging out')

  req.session.destroy()

  return res.redirect('/')
}
