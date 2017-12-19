const EventEmitter = require('events');
const mongodb = require('mongodb').MongoClient;
const async = require('async');
const uuid = require('uuid');


class Connector extends EventEmitter{
   
   constructor(config){
      super();
      mongodb.connect(config.mongo, (err, db) => {
         (err, cons) => {
            if(!err){
               this._pool = cons[0];
               this._db = cons[1];
               this.emit('ready');
            }else{
               this.emit('error', err);
            }
         }
      });           
   }



   // Auth User
   authAdmin(cb){
   }
}

module.exports = Connector;
