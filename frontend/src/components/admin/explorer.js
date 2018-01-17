import React, {Component} from 'react';
import CompanyList from './companyList.js';

export default class Explorer extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }
   componentWillMount(){
      
   }
   render(){
      return (
         <div style={{
               padding: "20px 50px"
         }}>
                <p className="title">
                  Explore
               </p> 
               <CompanyList refreshData={this.props.refreshData} companyList={this.props.companyList} />
         </div>
                  )
   }
}
