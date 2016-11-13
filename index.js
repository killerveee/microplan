var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var expressValidator = require('express-validator')
var app = express()

var appMode = 'dev' // default appMode
if (process.env.NODE_ENV === 'production') {
  appMode = 'prod'
}

var setAppConfig = require('./config/' + appMode + '.js')
var initDb = require('./config/' + appMode + '.db.js')

initDb(function () {
  setAppConfig(app,
    function (app) {
      // common configs
      app.set('port', (process.env.PORT || 5000))
      app.set('views', path.join(__dirname, 'views'))
      app.set('view engine', 'ejs')

      // middlewares
      app.use(express.static(__dirname + '/public'))
      app.use(bodyParser.urlencoded({ extended: true })) // for parsing
      app.use(bodyParser.json()) // for parsing application/json
      app.use(expressValidator())
      app.use(session({
        secret: app.get('cookieSecret'),
        cookie: {}
      }))

      // routers
      var auth = require('./auth/router.js')
      app.use('/auth', auth)

      app.get('/',
        function (req, res) {
          var apiToken = req.session.microplanToken

          if (!apiToken) {
            return res.render('index', {
              githubClientId: req.app.get('github.clientId')
            })
          }

          return res.render('app', {
            appName: 'logged in app'
          })
        }
      )

      app.post('/github/issues', require('./create_issue.js'))
      app.post('/api/githubissue', require('./api/githubIssue/post.js'))
      app.post('/api/feature', require('./api/feature/post.js'))

      app.listen(app.get('port'),
        function () {
          console.log('Node app is running at localhost:' + app.get('port'))
        }
      )
    }
  )
})
