const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
   const body = req.body;
   console.log("Verifying Token:", req.body, req.headers['x-access-token']);
   const token = (body.token) ? body.token :  req.headers['x-access-token'];
   if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });
   jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=> {
      if (err)
         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      next();
   });
};
module.exports = verifyToken;
