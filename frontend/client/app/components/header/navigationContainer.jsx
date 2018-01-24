import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavigationDesktop from './navigationDesktop.jsx';
import NavigationMobile from './navigationMobile.jsx';
import Styles from './navigation.css';
import { Link } from 'react-router-dom';

import Routes from '../../routes.js';

const links = Routes;

const mapStateToProps = (state, ownProps) => {
      return {
            state
      }
};
class Navigation extends Component {
   constructor(props){
      super(props); 
   }
   render(){
      return <div className={Styles.navigation}>
               <NavigationDesktop links={links}/>
               <NavigationMobile links={links}/>
            </div>
   }
};
export default connect(mapStateToProps)(Navigation)
