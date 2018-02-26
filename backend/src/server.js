require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const connector = require('./connector');
const config = require('../conf'); 
const verifyToken = require('./utils/auth.js');
const upload = require('./utils/multer.js');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var c =  new connector(config.db);

c.on('ready', () => {
   console.log('MongoDB plugged in at the wall');
}); 
app.get('/api/users', (req, res) => {
   c.getUsers((err, resp)=>{
      res.send(resp)
   })
})
app.post('/api/newuser', (req, res) => {
   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
   c.addUser({
            email: req.body.email,
            password: hashedPassword
      },
      (err, db_res)=> {
         if (err) return res.status(500).send("There was a problem registering the user.")
         let token = jwt.sign({ id: db_res._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400
         });
      res.status(200).send({ 
        auth: true, 
        token: token,
        res: db_res,
        hash: hashedPassword 
     });
   });
});
app.post('/api/login', (req,res)=>{
   c.getUser({email: req.body.email}, (err, user)=>{
         if (err) return res.status(500).send('Error on the server.');
         if (!user) return res.status(404).send('No user found.');
         const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
         if (!passwordIsValid) return res.status(400).json(JSON.stringify({ auth: false, token: null }));
         const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
         });
         res.status(200).json(JSON.stringify({ auth: true, token: token }));
   });
});
app.post('/api/verify', (req, res)=>{
   verifyToken(req, res, ()=>{
      res.status(200).json(JSON.stringify({auth: true}))
   })
});
// Where me routes!?
app.get('/api/companies', (req, res)=>{
   c.getCompanies((err, companies)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(companies)
   })
})
app.get('/api/companies/relationships', (req, res)=>{
   c.getCompanies((err, arr)=>{
      if(!err){
         console.log(arr);
         c.getRelationships(arr, (err, rels)=>{  
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({
               companyList: arr,
               relationships: rels
            }));
         });
      }else{
         res.status(300).send(err);
      }
   });
})
app.post('/api/companies/create', verifyToken, (req, res, next)=>{
   let company = {
      name: req.body.name,
      est: req.body.est
   }
   c.createCompany(company, (err,result)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(result)
   })
})
app.post('/api/companies/logos/:company_id',  upload.single('company-logo'), async (req, res) => {
   try {
      c.loadLokiCollection('company-images', (col) =>{
         const data = col.insert(req.file);
         c.loki.saveDatabase();
         res.send({ 
            id: data.$loki, 
            fileName: data.filename, 
            originalName: data.originalname 
         });
      })  
   } catch (err) {
      res.sendStatus(400);
   };
})
app.get('/api/companies/logos', async (req, res) => {
   try {
      await c.loadLokiCollection('company-images', (col)=>{
         res.send(col.data);
      });
   } catch (err) {
      res.sendStatus(400);
   }
})
app.get('/api/companies/logos/:id', async (req, res) => {
   try {
      await c.loadLokiCollection('company-images', (col)=>{
         const result = col.findOne(req.params.id);
         if (!result) {
            res.sendStatus(404);
            return;
         };
         res.setHeader('Content-Type', result.mimetype);
         fs.createReadStream(path.join(config.db.uploads.path, result.filename)).pipe(res);
      });
   } catch (err) {
      res.sendStatus(400);
   }
})
app.post('/api/companies/update', verifyToken, (req, res, next)=>{
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
app.post('/api/companies/remove', verifyToken, (req, res, next)=>{
   let id = req.body.id;
   c.removeCompany(id, (err,result)=>{
      if (err) res.status(300).send(err) 
      else res.status(200).send(result)
   })
})
app.listen(3000, (req, res)=>{
     console.log('Listening for magick on port 3000...')
})

