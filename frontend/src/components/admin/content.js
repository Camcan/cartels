import React, { Component } from 'react';

export default class Content extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props,
      }
   }
   componentWillMount(){
   
   }
   componentWillReceiveProps(newProps){
   
   }
   render(){
      return (
         <div style={{width: "100%", background: "#eee"}}>
            {this.props.children}
         </div>
         );
   }
}
