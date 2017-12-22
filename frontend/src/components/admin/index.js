import React, { Component } from 'react';
import { baseUrl } from '../../config/api.js';
import Menu from './menu.js';
import Content from './content.js';

export default class Admin extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
         selectedPage: "Explore"
      }
   }
   componentWillMount(){
   
   }
   componentWillReceiveProps(newProps){
   
   }
   selectPage(page){
      this.setState({selectedPage: page})
   }
   render(){
      return (
         <div style={{width: "100%"}}>
            <h2>Admin Panel</h2>
            <div style={{height: "100%", display: "flex", flexFlow:"row nowrap"}}>
               <Menu selectPage={this.selectPage.bind(this)} selected={this.state.selectedPage}/>
               <Content>

               </Content>
            </div>
         </div>
         );
   }
}
