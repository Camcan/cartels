import React, { Component } from 'react';
import Styles from './about.css';
import Opener from '../page/opener.jsx';

export default class Home extends Component {
   constructor(props){
      super(props)
      this.state = {
         ...this.props.content
      }
   }
   render() {
      return (
               <div className={Styles.main}>
                  <Opener opener={this.state.opener} />
               </div>
            )
   }
}

