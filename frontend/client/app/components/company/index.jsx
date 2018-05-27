import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
       selectCompany,
       updateCompanyList,
       updateCompanyRels
} from '../../actions/companies.js'; 
import API from '../../utils/api.js';
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
       selectCompany,
       updateCompanyList,
       updateCompanyRels
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
        console.log("mounting...")
      API.getRelationships((data)=>{
        console.log(data);
        this.props.updateCompanyList(data.companyList);
        this.props.updateCompanyRels(data.relationships);
      });
	}
	componentWillReceiveProps(newProps){
         this.setState({
            ...this.state,
             ...newProps
         });
	}
    _renderProfile(){
         const co = this.state.companyList.filter((c)=>{
            return c._id == this.state.selectedCompany;
        })[0] || {}; 	    
        const profileClass = [
            Styles.companyProfile,
            (this.props.selectedCompany) ? Styles.active : ""
        ].join(" ");
        return (
            <div className={profileClass}>
                <h2>{co.name}</h2>
				<p>{co.est}</p>
			</div>
        );
    }
	render(){
        const {selectCompany} = this.props;
        
        return <div className={Styles.container}>
		    <div className={Styles.network}>
                <Network data={this.state.companyList} 
                    rels={this.state.companyRels}
                    selected={
                        (this.props.selectedCompany) ? [this.props.selectedCompany] 
                        : null
                    }
                    handleSelection={
                        (id)=>{
                            selectCompany(id);
                            console.log("SelectingCompany", id);
                        }
                    } 
                />
            </div>
		    {this._renderProfile()}
        </div>
	
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile)


