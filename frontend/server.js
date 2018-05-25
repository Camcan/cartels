const path = require('path');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./utils/auth.js');


app.set('port', (process.env.PORT || 80));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('./client/public'));
app.use('/static', express.static('./build/static'));
app.locals.settings['x-powered-by'] = false;

app.get(['/', '/home'], (req, res)=> {
      res.sendFile(path.join(__dirname, 'client/index.html'))
})
app.get('/admin', (req, res)=> {
   let token = (req.param('token')) ? req.param('token') : req.headers['x-access-token'];
   auth.check(token, (err, auth)=>{
      if (err) return res.status(500).sendFile(path.join(__dirname, 'build/login.html'));
      return ( auth ) ?  res.status(200).sendFile(path.join(__dirname, 'build/index.html')) : res.redirect('/login');
   })
})
app.get('/login', (req, res)=>{
   auth.check(req.headers['x-access-token'], (err, auth)=>{
      if (err) return res.status(500).sendFile(path.join(__dirname, 'build/login.html'))
      console.log(auth)
      return ( auth ) ? res.redirect('/admin') : res.status(200).sendFile(path.join(__dirname, 'build/login.html'));
   })
})
app.post('/login', (req, res)=>{
   if ((typeof req.body.email == 'string') && (typeof req.body.password == 'string')){
      auth.login({
            email: req.body.email,
            password: req.body.password
         },
         (err, resp)=>{
            if (err) throw err;
            else {
               res.status(200).json(resp);
            }
         }
      );
   } 
})
app.use(function(req, res) {
   res.status(400);
   res.sendFile(path.join(__dirname, 'client/views/404.html'));
})

app.use(function(error, req, res, next) {
   res.status(500);
})

app.listen(app.get('port'), function() {
   console.log('Port ' + app.get('port') + '; where the magic happens')
})
