import React, {Component} from 'react';

import Styles from './companyProfile.css';


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
             ...newProps
         });
	}
    _renderChildren(children){
         if (children) return (
             <div className={Styles.childrenContainer}>
                <h3>Children:</h3>
                <div className={Styles.children}>
                   
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
                                        ()=>this.props.selectNode(x._id)
                                }>
                                    {
                                        (x.logoUrl) ? (
                                            <div className={Styles.logo}>
                                                <img src={this.props.apiUrl + x.logoUrl} /> 
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
         const co = this.props.companyList.filter((c)=>{
            return c._id == this.props.selectedCompany;
        })[0] || {};
        const children = (co.children) ? this.props.companyList.filter((c)=>{
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
                            src={this.props.apiUrl + co.logoUrl} 
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

export default CompanyProfile;


