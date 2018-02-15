const fetch = require('node-fetch');
const serverUrl = (process.env.NODE_ENV == 'production') ? process.env.BACKEND_URL : 'http://localhost:3001/api/';

const authUtil = {
   check: function(token, next) {
      if (!token) return next(null, false);
      fetch(serverUrl + 'verify', {
         method: 'POST', 
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
