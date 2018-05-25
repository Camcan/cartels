const fetch = require('node-fetch');
const ip = require('ip');

let serverUrl = ip.address(); 
serverUrl = 'http://' + serverUrl + ':3000/api/'; //process.env.BACKEND_URL


const authUtil = {
   check: function(token, next) {
      if (!token) return next(null, false);
      fetch(serverUrl + 'verify', {
         method: 'POST',
         mode: 'cors',
         body: JSON.stringify({token: token}), 
         headers: {'Content-Type': 'application/json'}
      }).then(res => res.json())
      .catch(error => next(error))
      .then(response => {
         response = JSON.parse(response);
         return  next(null, response.auth)
      });
   },
   login: function(credentials, next){
      fetch(serverUrl + 'login', {
            method: 'POST',
            mode: 'cors',   
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json'}
      }).then(res =>{ 
         return res.json()
      })
      .catch(error => next(error))
      .then(response => {
         next(null, response)
      })
   }
}
module.exports = authUtil;
