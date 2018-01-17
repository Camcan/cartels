const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connector = require('./connector');
const config = require('../conf'); 
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


var c =  new connector(config.db);

c.on('ready', () => {
   console.log('MongoDB plugged in at the wall');
}); 

// Where me routes!?
app.get('/api/companies', (req, res)=>{
   c.getCompanies((err, companies)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(companies)
   })
})
app.post('/api/companies/create', (req, res)=>{
   console.log("BODY:", req.body);
   let company = {
      name: req.body.name,
      est: req.body.est
   }
   console.log("COMPANY:", company);
   c.createCompany(company, (err,result)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(result)
   })
})
app.post('/api/companies/update', (req, res)=>{
   let company = {
      _id: req.body._id,
      name: req.body.name,
      est: req.body.est,
      children: req.body.children
   };
   c.updateCompany(company, (err,result)=>{
         if (err) res.status(300).send(err)
         else res.status(200).send(result)
   })
})
app.post('/api/companies/remove', (req, res)=>{
   let id = req.body.id;
   c.removeCompany(id, (err,result)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(result)
   })
})
app.listen(3000, (req, res)=>{
     console.log('Listening for magick on port 3000...')
})

