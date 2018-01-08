import React, { Component } from 'react';
// import Util from '../../utils/admin.js';

export default class Editor extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
         editing: false,
         stagedData: {}
      }
   }
   componentWillMount(){
      if (this.props.companyData){
         this.setState({editing: true})
      } else this.setState({editing: false})
   }
   componentWillReceiveProps(newProps){
   
   }
   stageChange(key, e){
      let value = e.target.value;
      if (!this.props.companyData || (this.props.companyData[key] !== value)){
         let toStage= this.state.stagedData;
         toStage[key] = value;
         this.setState({stagedData: toStage})
         console.log("Staged Data:", this.state.stagedData);
      }
   }
   saveChange(){
      
   }
   toggleCompanySelection(companyId, rel, staged, current){
      var selected = staged[rel] || current[rel];
      if(!selected.includes(companyId)){
         selected.push(companyId);
      }else{
         var ind = selected.indexOf(companyId);
         selected.splice(ind, 1);
      }
      staged[rel] = selected;
      this.setState({
         stagedData: selected
      });
   }

   _renderOwners(staged, current){
      let toRender = staged.owners || current.owners || [];
      return (
               <div class="buttons">
               { toRender.forEach( x => {
                  return <span className="button">x.name</span>
                  })
               }
               </div>
            )
   }
   _renderDropdown(){
      return (
         <div class="control">
           <div class="select">
               <select>
                     <option>Company</option>
                     <option onClick={}>With options</option>
               </select>
            </div>
         </div>
      )
   }
   render(){
      let staged = this.state.stagedData;
      let current = this.props.companyData || {};
      return (
         <div style={{width: "600px"}}>
           <div className="field is-horizontal">
             <label className="label">Company Name:</label>
               <div className="control">
                   <input className="input" type="text" 
                     value={staged.companyName || current.companyName}
                     onChange={(e)=>this.stageChange("companyName", e)}
                     placeholder="Company Name" />
               </div>
            </div>
            <div className="field is-horizontal">
            <label className="label">Owned By:</label>
               <div className="control">
                  {this._renderOwners(staged, current)}
                   <input className="input" type="text" 
                     onChange={(e)=>this.stageChange("newOwner", e)}
                     placeholder="Add Ownership" />
                     {this.renderDropdown} 
                     <button onClick={console.log("newOwner:", staged.newOwner)} className="button is-primary">+</button>
               </div>
            </div>
         </div>
         );
   }
}
