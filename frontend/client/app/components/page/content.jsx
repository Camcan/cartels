import React, { Component } from 'react';
import Styles from './page.css';


export default class Layout extends Component {
   render(){
      return <div className={Styles.content}>
            { this.props.children }
         </div>
   }
}
