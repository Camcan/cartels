const AuthUtil = {
   getToken: function(){
     return window.localStorage.getItem('auth-token')
   }
}
export default AuthUtil;
