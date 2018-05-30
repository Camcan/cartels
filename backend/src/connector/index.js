const EventEmitter = require('events');
const mongodb = require('mongodb').MongoClient;
const uuid = require('uuid');
const async = require('async');
const Loki = require('lokijs');


class Connector extends EventEmitter{
   
   constructor(config){
      super();
      async.parallel([
            (cb)=> mongodb.connect(config.mongo, (err, db)=> cb(err, db)),
            (cb)=> {
               const loki = new Loki('${config.uploads.path}/${config.uploads.db_name}', { persistenceMethod: 'fs' });
               cb(null, loki);
            }
         ], (err, cons)=>{
            if(!err){
               this._db = cons[0];
               this.loki = cons[1];
               this.emit('ready');
            }else{
               this.emit('error', err);
            }
      }); 
   }
   loadLokiCollection(colName, cb, loki = this.loki){
      loki.loadDatabase({}, () => {
         const collection = loki.getCollection(colName) || loki.addCollection(colName);
         cb(collection);
      });
   }
   addUser(user, cb){
      this._db.collection('users').insertOne(user, cb);
   }
   getUsers(cb){
      this._db.collection('users').find({}).toArray(cb);
   }
   getUser(user, cb){
      this._db.collection('users').findOne(user, cb)
   }
   getCompanies(cb){
      this._db.collection('companies').find({}).toArray(cb);
   }
   getRelationships(companies, cb){
      let relationships = [];
      console.log("Companies:", companies, companies.length, companies[0])
      for (var i = 0; i < companies.length; i++){
         if (companies[i].children) {
            companies[i].children.forEach((ch)=>{
               relationships.push({from: companies[i]._id, to: ch})
               console.log("Relationships:", relationships);
            })
         };
         if (i == companies.length - 1){
            cb(null, relationships);
         };
      };
   }
   createCompany(co, cb){	
      var company = {
        _id: uuid.v4(), 
         name: co.name,
         est: co.est
      };

      this._db.collection('companies').insertOne(company, (err, res) => {
         cb(err);
      });   
   }
   updateCompany(id, co, cb){	
      if (this._db.collection('companies').update({_id: id}, co).nModified > 0) {
         cb(null, "Successfully updated " + co.name)
      } else {
         cb("ERR - no changes saved to DB")
      }

   }
   saveCompanyLogo(companyId, file, cb, colName = 'company-images', loki = this.loki){
       try {
          loki.loadDatabase({}, () => {
            const col = loki.getCollection(colName) || loki.addCollection(colName);
            console.log(typeof file);
            const data = col.insert(file);
            
	    const datas = {
               id: companyId,
               fileName: file.filename,
               originalName: file.originalname
            };
	    console.log(datas)
            cb(null, datas)
	
         });
       } catch (err) {
         cb(err)
       }
   }
   removeCompany(id, cb){
      if  (this._db.collection('companies').remove({_id: id}).nRemoved == 1) {
         cb(null, "Successfully deleted company:" + id)
      
         console.log("Successfully removed company: " + id);
      } else {
         cb("ERR - no changes saved to DB")
      }
      this._db.collection('companies').find({children: id}).forEach((co)=>{
         let i = co.children.indexOf(id);
         if (i !== -1) { 
            co.children.splice(i,1);
            console.log(this._db.collection('companies').save(co).nModified);
         }
      });
   }
};

module.exports = Connector;
