var express = require('express')
var path = require('path')
var app = express()

var appMode = 'dev' // default appMode
if (process.env.NODE_ENV === 'production') {
  appMode = 'prod'
}

var setAppConfig = require('./config/' + appMode + '.js')

setAppConfig(app,
  function (app) {
    // common configs
    app.set('port', (process.env.PORT || 5000))
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    // middlewares
    app.use(express.static(__dirname + '/public'))

    // routers
    var login = require('./login/router.js')
    app.use('/login', login)

    app.get('/',
      function (req, res) {
        res.render('index', {
          githubClientId: req.app.get('github.clientId')
        })
      }
    )

    app.listen(app.get('port'),
      function () {
        console.log('Node app is running at localhost:' + app.get('port'))
      }
    )
  }
)
