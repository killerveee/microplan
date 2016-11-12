var express = require('express')
var router = express.Router()

router.get('/github', require('./github.js'))

module.exports = router
