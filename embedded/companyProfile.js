import React, {Component} from 'react';
import CompanyList from './companyList.js';
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
    _renderParents(parents){
        if (parents.length > 0) return (
         <div className={Styles.parentsContainer}>
                <h3>Owned By:</h3>
                <CompanyList list={parents} 
                    select={(id)=>this.props.selectCompany(id)}
                    active={this.props.selectedCompany._id}
                    apiUrl={this.props.apiUrl}
                />
             
            <div className={Styles.separator}></div>
            </div>
        )
    }
    _renderChildren(children){
         if (children) return (
             <div className={Styles.childrenContainer}>
                <h3>Subsidiaries:</h3>
                <CompanyList list={children} 
                    select={(id)=>this.props.selectCompany(id)}
                    active={this.props.selectedCompany._id}
                    apiUrl={this.props.apiUrl}
                />
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
        let parents = this.props.companyRels.filter((rel)=>{
                        return (rel.to == co._id)
            }).map((rel)=>{
                return rel.from;
        });
        parents = this.props.companyList.filter((c)=>{
                return (parents.indexOf(c._id) > -1); 
        });
        console.log("PARETNST::", parents);
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
                { this._renderParents(parents) }
                { this._renderChildren(children) }
            </div>
        );
    }
};

export default CompanyProfile;


