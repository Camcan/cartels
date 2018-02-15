import AuthUtil from './auth.js';
const conf = require('../config/api.js');
const serverUrl = conf.baseUrl;

const authToken = AuthUtil.getToken;

const AdminUtil = {
   getCompanyList: (cb)=>{
    fetch(
      [serverUrl, "companies"].join(''),
      {mode: 'cors'}
   ).then((res)=>res.json())
   .then((data)=>{
      cb(data)             
   })
   .catch((err)=>{
      throw err
   });
   },
   createCompany: (data, cb)=>{
      fetch(
         [serverUrl, "companies/create"].join(''),
         {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                  'x-access-token': authToken(),
                  'Content-Type': 'application/json'
            })
         }
      ).catch(error => console.error('Error:', error))
      .then(response => cb(response));
   },
   updateCompany: (data, cb)=>{
      fetch(
         [serverUrl, "companies/update"].join(''),
         {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
               'x-access-token': authToken(),
               'Content-Type': 'application/json'
            })
         }
      ).catch(error => console.error('Error:', error))
      .then(response => cb(response));
   },
   removeCompany(id, cb){
      fetch(
         [serverUrl, "companies/remove"].join(''),
         {
            method: 'POST',
            body: JSON.stringify({
               "id": id
            }),
            headers: new Headers({
               'x-access-token': authToken(),
               'Content-Type': 'application/json'
            })
         }
      ).catch(error => console.error('Error:', error))
      .then(response => cb(response));

   }

}



export default AdminUtil;
