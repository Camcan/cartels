var conf = require('../config/api.js');

const serverUrl = conf.baseUrl;

const AdminUtil = {
   getCompanyList: (cb)=>{
      
      fetch([serverUrl, "companies"].join(','))
         .then((res)=>{
            cb(res)
         })
         .catch((error)=>{
            throw error
         });
   }
}



export default AdminUtil;
