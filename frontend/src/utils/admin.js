var conf = require('../config/api.js');

const serverUrl = conf.baseUrl;

const AdminUtil = {
   getCompanyList: (cb)=>{
    fetch(
            [serverUrl, "companies"].join(''),
            {mode: 'cors'}
      ).then((res)=>res.json())
      .then((data)=>{
         console.log("ServerUrl:", serverUrl)
         cb(data)             
      })
      .catch((error)=>{
         throw error
      });
    },
   createCompany: (data, cb)=>{
      fetch(
         [serverUrl, "companies/create"].join(''),
         {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'})
         }
      ).catch(error => console.error('Error:', error))
      .then(response => cb(response));
   }

}



export default AdminUtil;
