const serverUrl = [
    'http://',
    '149.28.167.13', 
    ':3000/api/' 
].join('')

const API = {
   getCompanyList: (cb)=>{
    fetch(
            [serverUrl, "companies"].join(''),
            {mode: 'cors'}
      ).then((res)=>res.json())
      .then((data)=>{
         console.log("ServerUrl:", serverUrl)
         cb(data)             
      })
      .catch((err)=>{
         throw err
      });
    },
   getRelationships:(cb)=>{
      fetch(
           [serverUrl, "companies/relationships"].join(''),
           {mode: 'cors'}
      ).then((res)=>{
         console.log(res.body)
         return res.json()
      })
      .then((data)=>{
         console.log(data);
         cb(data)
      })
      .catch((err)=>{
         throw err
      })
   }
}
export default API;
