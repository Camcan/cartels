import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCompany } from '../../actions/companies.js'; 
import conf from '../../config/api.js';

import Styles from './companyProfile.css';
import Network from '../network/index.jsx';

const mapStateToProps = (state) => {
   return {
      ...state.companies
   }
};
const mapDispatchToProps = (dispatch, ownProps) => {  
   let actions = bindActionCreators({
       selectCompany
   }, dispatch);
   return {
          ...actions
       };
};

class CompanyProfile extends Component { 
	constructor(props){
		super(props);
		this.state = {
		    ...props
        }
	}
	componentDidMount(){
	
    }
	componentWillReceiveProps(newProps){
         this.setState({
            ...this.state,
             ...newProps
         });
	}
    _renderChildren(children){
         if (children) return (
             <div className={Styles.childrenContainer}>
                 <div className={Styles.children}>
                   
                    <h3>Children:</h3>
                    {
                        children.map((x)=>{
                            return (
                                <a className={[
                                    Styles.child,
                                    "button",
                                    "is-black",
                                    "is-small"
                                ].join(" ")}
                                    onClick={
                                        ()=>this.props.selectCompany(x._id)
                                }>
                                    {
                                        (x.logoUrl) ? (
                                            <div className={Styles.logo}>
                                                <img src={conf.baseUrl + x.logoUrl} /> 
                                            </div> 
                                        ) : null
                                    }
                                    <p>
                                        { x.name }
                                    </p>
                                </a>
                            )
                        })
                    }
                </div>
             </div>
        )
    }
    render(){
         const co = this.state.companyList.filter((c)=>{
            return c._id == this.state.selectedCompany;
        })[0] || {};
        const children = (co.children) ? this.state.companyList.filter((c)=>{
            return co.children.includes(c._id)
        }) : null;
        
        return (
            <div className={[
                    Styles.container,
                    "box"
                ].join(" ")
            }>
                 <div className={Styles.top}>
                    { 
                        (co.logoUrl) ? <img 
                            className={Styles.logo}
                            src={conf.baseUrl + co.logoUrl} 
                        /> : null 
                    }
                    <div className={Styles.content}>
                        <h2>{co.name}</h2>
                        { 
                            (co.website) ? (
                                <a className={Styles.link} href={co.website}>
                                    {co.website}
                                </a>
                            ) : null
                        }
                        { (co.est) ? <p>{"est: " + co.est }</p> : null }
                    </div>
                </div>
                <div className={Styles.separator}></div>
                { this._renderChildren(children) }
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile)


