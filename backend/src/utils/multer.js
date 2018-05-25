const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const conf = require('../../conf.js');
const upload = multer();

const imageStore = multer.diskStorage({
      destination: (req, file, cb)=>{
         let dest = (conf.db.uploads.path);
         if (!fs.existsSync(dest)){
            mkdirp(dest, (err)=>{
               if (err) console.error(err)
               cb(null, dest);
            });
         } else cb(null, dest);
   },
   filename: (req, file, cb)=>{
      cb(null, req.params.id)
   } 
})

const imageFilter = function (req, file, cb) {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('File Rejected: Not an image'), false);
   }
   cb(null, true);
};
module.exports =  multer({ storage: imageStore, fileFilter: imageFilter, dest: '${conf.db.uploads.path}/' });
