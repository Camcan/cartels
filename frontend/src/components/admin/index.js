import React, { Component } from 'react';
import { baseUrl } from '../../config/api.js';
import Util from '../../utils/admin.js';
import Menu from './menu.js';
import Content from './content.js';
import CompanyExplorer from './explorer.js';

export default class Admin extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
         selectedPage: "Explore",
         selectedCompany: null,
         companyList: []
      }
   }
   componentWillMount(){
      this.updateCompanyList()
   }
   componentWillReceiveProps(newProps){
   
   }
   updateCompanyList(){
       Util.getCompanyList((companies)=>{
         console.log("Companies:", companies)
         this.setState({companyList: companies})
       })
   }
   selectPage(page){
      this.setState({selectedPage: page})
   }
   renderContent(){
       switch(this.state.selectedPage) {
            case "Explore":
               return <CompanyExplorer companyList={this.state.companyList} />
               break;
            case "Edit":
               return null;
               break;
            default:
               return null
         }

   }
   render(){
      return (
         <div style={{width: "100%"}}>
            <div style={{height: "100%", display: "flex", flexFlow:"row nowrap"}}>
               <Menu selectPage={this.selectPage.bind(this)} selected={this.state.selectedPage}/>
               <Content>
               { this.renderContent() }
               </Content>
            </div>
         </div>
         );
   }
}
