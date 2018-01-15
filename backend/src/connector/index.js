const EventEmitter = require('events');
const mongodb = require('mongodb').MongoClient;
const async = require('async');
const uuid = require('uuid');


class Connector extends EventEmitter{
   
   constructor(config){
      super();
      mongodb.connect(config.mongo, (err, db) => {
            if(!err){
               this._db = db;
               this.emit('ready');
            }else{
               this.emit('error', err);
            }
      });           
   }

   getCompanies(cb){
      this._db.collection('companies').find({}).toArray((err, result) => {
         cb(err, result);
      });
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
   // Auth User
   authAdmin(cb){
   }
}

module.exports = Connector;
