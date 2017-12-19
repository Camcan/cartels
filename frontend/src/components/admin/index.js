import React, { Component } from 'react';
var conf = require('../../conf.js');

export default class Admin extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props
      }
   }
   componentWillMount(){
   
   }
   componentWillReceiveProps(newProps){
   
   }
   render(){
      return (
         <h2> HELLO WORLD </h2>
      );
   }
}
