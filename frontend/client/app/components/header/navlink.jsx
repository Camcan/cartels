import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import Styles from './navigation.css';

class NavLink extends Component {
   constructor(props){
      super(props)
   }
   render(){
      const section = this.props.section;
      return  <Link
            onClick={()=>window.scrollTo(0,0)}
            to={ section  === 'GO_HOME' ? '/' : section}
            className="nav-link" activeClassName={Styles.active}      
         >
            <span onClick={this.props.onClick}>
               {this.props.children}
            </span>
         </Link>
   }
};

export default NavLink;
