import React, { Component } from 'react';
import AdminUtil from '../../../utils/admin.js';

export default class LogoUploader extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
         stagedLogo: null,
         stageDelete: false
      }
   }
   componentWillReceiveProps(newProps){
      this.setState({ stagedLogo: null }) 
   }
   stageLogo(e){
      this.setState({stagedLogo: e.target.files[0]});
   }
   uploadLogo(){
      AdminUtil.uploadLogo(this.props.companyId, this.state.stagedLogo, (res)=>{
        console.log(res);
         this.props.refreshData(); 
      })   
   }
   render(){
      console.log("UPLOAD RENDERED");
      return (
            <div className="field is-horizontal">
               <label className="label" style={{width: "150px", textAlign: "right"}}>Logo:</label>
               <div className="control">
                     <input type="file" name="company-logo" accept=".jpg, .jpeg, .png" onChange={(e)=>this.stageLogo(e)}/>
                     <button onClick={()=>this.uploadLogo()}>Upload</button> 
               </div>
            </div>
      )
   }
}
