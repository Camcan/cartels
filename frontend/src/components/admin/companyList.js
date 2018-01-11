import React, {Component} from 'react';
import EditorModal from './editorModal.js';

export default class CompanyList extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         selectedCompany: null,
         modalOpen: false
      }
   }
   componentWillMount(){
      
   }
   selectCompany(c){
      this.setState({selectedCompany: c});
      this.toggleModal(true);
   }
   newCompany(){
      this.setState({selectedCompany: null});
      this.toggleModal(true);
   }
   toggleModal(truthy){
      this.setState({modalOpen: truthy});
   }
   _renderList(){
      return this.props.companyList.map((x)=>{
         return (
            <a className="button is-dark" style={{width: "100%", margin: "5px"}} onClick={()=> this.selectCompany(x)}>
               <p style={{width: "100%", textAlign: "left"}}>{x.name}</p>
            </a>
         )
      })

   }
   render(){
      return (
         <div>
            <h3 className="title">Companies Editor</h3>
            <div className="card" style={{padding: "20px 50px"}}>
               <div style={{display: "flex", justifyContent: "flex-end"}}>
                  <a className="button is-primary" onClick={this.newCompany.bind(this)}>New Company</a>
               </div>
               { this._renderList() }
            </div>
            <EditorModal 
               companyData={this.state.selectedCompany} 
               companyList={this.state.companyList} 
               closeModal={()=> this.toggleModal(false)} 
               modalOpen={this.state.modalOpen}
            />
         </div>
      )
   }
}
