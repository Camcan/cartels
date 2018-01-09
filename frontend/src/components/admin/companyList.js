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
   toggleModal(truthy){
      this.setState({modalOpen: truthy});
   }
   render(){
      return (
         <div>
            <h3 className="title">Companies Editor</h3>
            <div className="card">
               {
                  this.props.companyList.map((x)=>{
                     return (
                        <a className="button is-dark" style={{width: "90%", margin: "5px"}} onClick={()=> this.selectCompany(x)}>
                           {x.name}
                        </a>
                     )
                  })
               }
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
