import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Styles from './opener.css';

export default class ArtContainer extends Component {
   constructor(props){
      super(props)
   }
   render () {
      return (
               <div className={Styles.main}>
                  <div className={Styles.openerText}>
                     {this.props.opener}
                  </div>
               </div>
            )
   }
}

