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
import Styles from './styles.css';
import Network from '../network/index.jsx';
import CompanyProfile from './companyProfile.jsx';
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

class NetworkContainer extends Component { 
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
	render(){
        const {selectCompany} = this.props;
         const profileClass = [
            Styles.companyProfile,
            (this.props.selectedCompany) ? Styles.active : ""
        ].join(" ");    
        return <div className={Styles.container}>
		    <div className={Styles.network}>
                <Network 
                    background="linear-gradient(to right, #EEE, #FFF)"
                    height="100%"
                    data={this.state.companyList} 
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
		    <div className={profileClass}>
                <CompanyProfile />
            </div>
        </div>
	
	}
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(NetworkContainer);
