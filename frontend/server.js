var path = require('path')
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'html')
app.use('/', express.static(path.join(__dirname, 'client/public')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));
app.locals.settings['x-powered-by'] = false

app.get(['/', '/home'], function(req, res) {
      res.sendFile(path.join(__dirname, 'client/index.html'))
})
app.get(['/admin'], function(req, res) {
   res.sendFile(path.join(__dirname, 'build/index.html'))
})
app.use(function(req, res) {
   res.status(400);
   res.sendFile(path.join(__dirname, 'client/views/404.html'));
})
app.use(function(error, req, res, next) {
   res.status(500);
  // res.render('500.jade', {title:'500: Internal Server Error', error: error});
})

app.listen(app.get('port'), function() {
   console.log('Port ' + app.get('port') + '; where the magic happens')
})
