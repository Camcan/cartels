const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const conf = require('../../conf.js');
const upload = multer();

const imageStore = multer.diskStorage({
      destination: (req, file, cb)=>{
         let companyId = req.params.company_id;
         let dest = conf.db.uploads.path;
         if (!fs.existsSync(dest)){
            mkdirp(dest, (err)=>{
               if (err) console.error(err)
               cb(null, dest);
            });
         } else cb(null, dest);
   },
   filename: (req, file, cb)=>{
      var f =  req.params.company_id;
      cb(null, f)
   } 
})

const imageFilter = function (req, file, cb) {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('File Rejected: Not an image'), false);
   }
   cb(null, true);
};
module.exports =  multer({ storage: imageStore, fileFilter: imageFilter, dest: '${conf.db.uploads.path}/' });
