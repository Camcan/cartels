import React, {Component} from 'react';
import API from './api.js';
import Styles from './styles.css';
import Network from './network.jsx';
import ModeSelector from './modeSelector.jsx';
import CompanyProfile from './companyProfile.jsx';

class NetworkContainer extends Component { 
	constructor(props){
		super(props);
		this.state = {
            companyList: [].
               activeList: [],
               companyRels: [],
               activeRels: [],
               filter: [],
               selectedCompany: []
        }
	}
	componentDidMount(){
        console.log("mounting...")
      API.getRelationships((data)=>{
        console.log(data);
        this.props.updateCompanyList(data.companyList);
        this.props.updateCompanyRels(data.relationships);
        this.props.setActiveList('All');
      });
	}
	componentWillReceiveProps(newProps){
        console.log("Container newProos;", newProps) 
        this.setState({
             ...newProps
         });
	}
	render(){
        const {
            selectCompany, 
            setActiveList,
            activeList,
            activeRels,
            filter,
            companiesList
        } = this.props;
         const profileClass = [
            Styles.companyProfile,
            (this.props.selectedCompany) ? Styles.active : ""
        ].join(" ");    
        return <div className={Styles.container}>
		    <div className={Styles.network}>
                <div className={Styles.modeSelector}>
                    <ModeSelector select={(list)=>this.setState({filter: filter})}
                        options={["All"]}
                        active={this.state.filter}
                    />
                </div>
                <Network 
                    background="linear-gradient(to right, #EEE, #FFF)"
                    height="100%"
                    data={this.state.activeList} 
                    rels={this.state.activeRels}
                    selected={
                        (this.state.selectedCompany) ? [this.state.selectedCompany] 
                        : null
                    }
                    handleSelection={
                        (id)=>{
                            this.setState({selectedCompany: id});
                            console.log("SelectingCompany", id);
                        }
                    } 
                />
            </div>
		    <div className={profileClass}>
                <CompanyProfile 
                    companyList={this.state.companyList}
                    selectedCompany={this.state.selectedCompany}
                />
            </div>
        </div>
	
	}
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(NetworkContainer);
