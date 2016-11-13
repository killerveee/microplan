var express = require('express')
var router = express.Router()

router.get('/login/github', require('./github.js'))
router.get('/logout', require('./logout.js'))

module.exports = router
