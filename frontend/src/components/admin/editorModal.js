import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import AdminUtil from '../../utils/admin.js';
import config from '../../config/api.js';
import 'react-datepicker/dist/react-datepicker.css';

const baseUrl = config.baseUrl;

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
         this.clearModal();  
         if (newProps.companyData) {
            this.setState({
               companyList: this.props.companyList.filter((c)=> {
                 return (c._id != newProps.companyData._id)
               }),
               stagedData: {},
               editing: true
            });
         }
   }
   clearModal(){
      this.setState({
         editing: false,
         stageDelete: false,
         stagedData: {}
      });
   }
   stageChange(key, e){
      let value = e.target.value;
      if (!this.props.companyData || (this.props.companyData[key] !== value)){
         let toStage= this.state.stagedData;
         toStage[key] = value;
         this.setState({stagedData: toStage})
      }
   }
   saveChange(action){
      if (action == 'create'){
          AdminUtil.createCompany(this.state.stagedData, (res)=>{
            this.props.refreshData();
            this.props.closeModal();
            this.clearModal();
         })
      } else if (action == 'update'){
         let postData = {
            ...this.props.companyData,
            ...this.state.stagedData,
            _id: this.props.companyData._id
         };
         console.log("Update Initialized...", postData)
         AdminUtil.updateCompany(postData, (res)=>{
            console.log(res);
            this.props.refreshData();
            this.props.closeModal();
            this.clearModal(); 
        });
      } else if (action == 'delete') {
         console.log("Deletion Initialized..") 
         AdminUtil.removeCompany(this.props.companyData._id, (res)=>{
            this.props.refreshData();
            this.props.closeModal();
            this.clearModal();
         })
      }
   }
   toggleCompany(id, rel){
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
                        return c._id == x
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
   _renderDropdown(current, staged){
      let children = (staged) ? (staged.children || current.children) : ((current.children) ? current.children : []);
      let id = (this.state.editing) ? this.props.companyData._id : 0;
      let companyList = this.props.companyList.filter((c)=>{
         return c._id != id
      });
      if (children) {
         console.log("Existing Children...", children)
         companyList = companyList.filter((c)=> {
            return !children.includes(c._id)
         });
      }
      return (
         <div className="control">
           <div className="select">
               <select id="child-companies" onChange={(e)=> this.toggleCompany(e.target.value, 'children')}>
                     <option>Select Company</option>

                     {
                        companyList.map((c)=> {
                           return <option value={c._id}>{c.name}</option>
                        })
                     }
               </select>
            </div>
         </div>
      )
   }
   stageLogo(e){
      this.setState({stagedLogo: e.target.files[0]});
   }
   uploadLogo(){
      AdminUtil.uploadLogo(this.props.companyData._id, this.state.stagedLogo, (res)=>{
        console.log(res);
         this.props.refreshData(); 
      })   
   }
   _renderLogoUpload(){
      console.log("UPLOAD RENDERED");
      if (this.state.editing) return (
            <div className="field is-horizontal">
               <label className="label" style={{width: "150px", textAlign: "right"}}>Logo:</label>
               <div className="control">
                     <input type="file" name="company-logo" accept=".jpg, .jpeg, .png" onChange={(e)=>this.stageLogo(e)}/>
                     <button onClick={()=>this.uploadLogo()}>Upload</button> 
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
               {(this.state.editing) ? "Save Changes": "Create Company"}
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
      let activeClass = (this.props.modalOpen) ? "is-active " : "";
      let currentName = (staged.name) ? staged.name : (current.name || "");
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
                     
                     {this._renderLogoUpload()}
                     <div className="field is-horizontal">
                        <label className="label" style={{width: "150px", textAlign: "right"}}>Established:</label>
                        <div className="control">
                        <DatePicker selected={moment((current.est||staged.est))}
                           onChange={(t)=>this.setState({
                                 stagedData: {
                                    ...this.state.stagedData,
                                    est: (t) ? t.unix() : undefined
                                 }
                           })}
                        />   
                        <input className="input" type="text" 
                              value={moment(((staged.est)? staged.est : current.est)||new Date()).format('MMMM Do YYYY')}
                              onChange={(e)=>this.stageChange("est", e)}
                              placeholder="Date Established" />
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
                           {this._renderDropdown(staged, current)} 
                        </div>
                     </div>
                  </div>
                  <div className="modal-card-foot">
                     { this._renderSaveButton() }
                     { (this.state.editing) ? this._renderDeleteButton() : null } 
                     <button className="button" onClick={this.props.closeModal}>Cancel</button>
                  </div>
               </div>
            </div>
      );
   }
}
