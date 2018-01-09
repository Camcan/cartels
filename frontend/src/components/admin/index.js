import React, { Component } from 'react';
import { baseUrl } from '../../config/api.js';
import Util from '../../utils/admin.js';
import Menu from './menu.js';
import Content from './content.js';
import CompanyList from './companyList.js';

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
       let companies = Util.getCompanyList();
       console.log("Companies:", companies)
       this.setState({companyList: companies})
   }
   componentWillReceiveProps(newProps){
   
   }
   selectPage(page){
      this.setState({selectedPage: page})
   }
   renderContent(){
       switch(this.state.selectedPage) {
            case "Explore":
               return <CompanyList companyList={this.state.companyList} />
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
            <h2>Admin Panel</h2>
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
