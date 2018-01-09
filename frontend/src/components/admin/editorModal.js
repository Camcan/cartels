import React, { Component } from 'react';

export default class EditorModal extends Component {
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
     
      if (newProps !== this.state.props){
         this.setState({ ...newProps});
         if (newProps.companyData) {
            this.setState({companyList: this.props.companyList.filter((c)=> {
                  return (c.id != newProps.companyData.id)
               })
            });
         }
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
   saveChange(){
      
   }
   toggleCompany(idString, rel){
      let id = parseInt(idString);
      let staged = this.state.stagedData;
      let current = this.props.companyData;
      let selected = (this.state.editing) ? (staged[rel] || current[rel]) : (staged[rel] || []);
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
               { toRender.map( (x) => {
                  let company = this.props.companyList.filter((c)=>{
                     return c.id == x
                  })[0];
                  console.log("Child company:", company);
                  return <span onClick={()=>{this.toggleCompany(x, 'children')}} className="button">{company.name}<a class="delete is-small"></a></span>
                  })
               }
               </div>
            )
   }
   _renderDropdown(){
      let current = this.state.stagedData || this.props.companyData;
      let companyList = this.state.companyList;

      if (current.children) {
         console.log("Existing Children...", current.children)
         companyList = this.props.companyList.filter((c)=> {
            (!current.children.includes(c.id) & (c.id != this.props.companyData.id) )
         });
         console.log("CompanyList:", companyList)
      };
      return (
         <div className="control">
           <div className="select">
               <select id="child-companies" onChange={(e)=> this.toggleCompany(e.target.value, 'children')}>
                     <option>Company</option>
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
   render(){
      let staged = this.state.stagedData;
      let current = this.props.companyData || {};
      let activeClass = (this.state.modalOpen) ? "is-active " : "";
      console.log("Staged:", staged)
      return (
         <div className={"modal " + activeClass }>
            <div className="modal-background" onClick={this.props.closeModal}></div>
               <div className="modal-content">
                  <div className="box">   
                     <div className="field is-horizontal">
                           <label className="label">Company Name:</label>
                           <div className="control">
                              <input className="input" type="text" 
                                 value={staged.name || current.name}
                                 onChange={(e)=>this.stageChange("companyName", e)}
                                 placeholder="Company Name" />
                           </div>
                        </div>
                        <div className="field is-horizontal">
                           <label className="label">Owned By:</label>
                           <div className="control">
                              {this._renderChildren(staged, current)}
                              <input className="input" type="text" 
                                 onChange={(e)=>this.stageChange("newOwner", e)}
                                 placeholder="Add Ownership" />
                              {this._renderDropdown()} 
                              <button onClick={console.log("newOwner:", staged.newOwner)} className="button is-primary">+</button>
                           </div>
                        </div>
                  </div>
               </div>
            </div>
      );
   }
}
