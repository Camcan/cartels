import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavLink from './navlink.jsx';
import Styles from './navigationDesktop.css';


class NavigationDesktop extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      };
      this.navLinks = this.navLinks.bind(this);
      this.props.history.listen((location, action)=>{
         console.log("Location Change")
      })
  }
   navLinks(){
      return this.props.links.map((link, i)=>{
         return (
             <NavLink key={i} section={link[1]}>{link[0]}</NavLink>
         );                                      
      })
 
   }
   render(){      
      return <div className={Styles.navDesktop}>
               <div className={Styles.linksList}>
               { this.navLinks() }
               </div>
         </div>
   }
};

export default withRouter(NavigationDesktop)
