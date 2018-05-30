import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
   toggleMobileNavigation,
   showMobileNavigation, 
   hideMobileNavigation 
} from '../../actions/menus.js'; 
import NavLink from './navlink.jsx';
import Styles from './navigationMobile.css';

const mapStateToProps = (state) => {
   return {
      menuOpen: state.menus.showNavMobile  
   }
};
const mapDispatchToProps = (dispatch, ownProps) => {  
   let actions = bindActionCreators({toggleMobileNavigation, showMobileNavigation, hideMobileNavigation }, dispatch);
   return {
          ...actions
       };
}

class NavigationMobile extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...this.props
      }
   }
   componentWillReceiveProps(nextProps) {
      if (this.props.menuOpen !== nextProps.menuOpen) {
         this.setState({menuOpen: nextProps.menuOpen});
      }
   }
   render(){  
      const {menuOpen, toggleMobileNavigation, hideMobileNavigation } = this.props;
      return <div className={Styles.navMobile}>
               <div onClick={()=>toggleMobileNavigation(!menuOpen)} 
                  className={[
                     (menuOpen ? Styles.openSandwhich : ""), 
                     Styles.sandwhichMenu
                  ].join(" ")}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
               <div className={[
                  "full-page",
                  Styles.navOverlay,
                  (this.props.menuOpen ? Styles.navOverlayShow : Styles.navOverlayHide)
                  ].join(" ")}>
                     <div className={Styles.linkList}>
                        {this.props.links.map(function(item, i){
                           return <span key={i} onClick={this.props.hideMobileNavigation}>
                                    <NavLink section={item[1]}>
                                          {item[0]}
                                    </NavLink>
                                 </span>
                        }, this)}
                   </div>         
               </div>
            </div>
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMobile)
