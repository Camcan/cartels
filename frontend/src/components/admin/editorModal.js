import React, { Component } from 'react';

export default class EditorModal extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
         editing: false,
         stagedData: {},
         stageDelete: false
      }
   }
   componentWillReceiveProps(newProps){
     
         this.setState({ 
            ...newProps,
            stageDelete: false            
         });
         if (newProps.companyData) {
            this.setState({
               companyList: this.props.companyList.filter((c)=> {
                 return (c.id != newProps.companyData.id)
               }),
               stagedData: {},
               editing: true
            });
         }else{
            this.setState({editing: false})
         }
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
   saveChange(action){
      if (action == 'create'){
      
      } else if (action == 'update'){
         
      } else if (action == 'delete') {
      
      }
   }
   toggleCompany(idString, rel){
      let id = parseInt(idString);
      let staged = this.state.stagedData;
      let current = this.props.companyData || {};
      let selected = (staged[rel] || current[rel] || []);
      if(!selected.includes(id)){
         selected.push(id);
      }else{
         var i = selected.indexOf(id);
         selected.splice(i, 1);
      }
      staged[rel] = selected;
      this.setState({
         stagedData: staged
      });
   }

   _renderChildren(staged, current){
      let toRender = staged.children || current.children || [];
      
      return (
               <div className="buttons">
               { 
                  (toRender.length == 0) ? <a className="button" disabled>
                     none
                  </a> : toRender.map( (x) => {
                     let company = this.props.companyList.filter((c)=>{
                        return c.id == x
                     })[0];
                     console.log("Child company:", company);
                     return <span onClick={()=>this.toggleCompany(x, 'children')} className="button">
                        {company.name}
                        <a className="delete is-small" style={{marginLeft: "5px"}}></a>
                     </span>
                  })
               }
               </div>
            )
   }
   _renderDropdown(){
      let current = this.state.stagedData || this.props.companyData;
      let companyList = this.state.companyList;
      let id = (this.state.editing) ? this.props.companyData.id : 0;
      if (current.children) {
         console.log("Existing Children...", current.children)
         companyList = this.props.companyList.filter((c)=> {
            return (!current.children.includes(c.id) & (c.id != id) )
         });
         console.log("CompanyList:", companyList)
      };
      return (
         <div className="control">
           <div className="select">
               <select id="child-companies" onChange={(e)=> this.toggleCompany(e.target.value, 'children')}>
                     <option>Select Company</option>

                     {
                        companyList.map((c)=> {
                           return <option value={c.id}>{c.name}</option>
                        })
                     }
               </select>
            </div>
         </div>
      )
   }
   _renderSaveButton(){
      let action = (this.state.editing) ? 'update' : 'create';
      return (

            <button className="button is-success" onClick={()=>this.saveChange(action)}>
               <span class="icon is-small">
                  <i class="fas fa-check"></i>
               </span>
               {(this.state.editing) ? "Save Changes": "Save Changes"}
            </button>
      )
   }
   _renderDeleteButton(){
      let action = (this.state.stageDelete) ? ()=>this.saveChange('delete') : ()=>this.setState({stageDelete: true});
      let btnClass = (this.state.stageDelete) ? "is-outlined" : ""
      return <button className={"button is-danger " + btnClass} onClick={action}>
               <span class="icon is-small">
                  <i class="fas fa-times"></i>
               </span>
               {(this.state.stageDelete) ? "Confirm Deletion" : "Delete"}
            </button>
   }
   render(){
      let staged = this.state.stagedData;
      let current = this.props.companyData || {};
      let activeClass = (this.state.modalOpen) ? "is-active " : "";
      let currentName = (staged.name) ? staged.name : current.name;
      console.log("Staged:", staged)
      return (
         <div className={"modal " + activeClass }>
            <div className="modal-background" onClick={this.props.closeModal}></div>
               <div className="modal-card">
                  <header className="modal-card-head">
                     <p className="modal-card-title">{currentName}</p>
                     <p>{current.id}</p>
                  </header>
                  <div className="modal-card-body">   
                     <div className="field is-horizontal">
                        <label className="label" style={{width: "150px", textAlign: "right"}}>Company Name:</label>
                        <div className="control">
                           <input className="input" type="text" 
                              value={currentName}
                              onChange={(e)=>this.stageChange("name", e)}
                              placeholder="Company Name" />
                        </div>
                     </div>
                     <div className="field is-horizontal">
                        <label className="label" style={{width: "150px", textAlign: "right"}}>Child Companies:</label>
                        <div className="control">
                           {this._renderChildren(staged, current)}
                        </div>
                     </div>
                     <div className="field is-horizontal">
                        <label className="label" style={{width: "150px", textAlign: "right"}}>New Child:</label>
                        <div className="control">
                           {this._renderDropdown()} 
                        </div>
                     </div>
                  </div>
                  <div className="modal-card-foot">
                     { this._renderSaveButton() }
                     { this._renderDeleteButton() } 
                     <button className="button" onClick={this.props.closeModal}>Cancel</button>
                  </div>
               </div>
            </div>
      );
   }
}
