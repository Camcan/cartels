import React, { Component } from 'react';
import logo from './logo.png';
import Admin from './components/admin';

import './App.css';


export default class App extends Component {
   constructor(props){
      super(props);
      this.state = {view : "admin"};
   }

   _render(){
      switch(this.state.view){
         case "admin":
            return (<Admin />);
         //case "home":
         //   return (<Home />;
         default:
            return (<Admin />);
      }  
   }

  render() {
    return (
      <div className="App">
            <div style={{flex: 1, display: 'flex', padding: 10}}>
               {this._render()}
            </div>
       </div>);
  }
}
