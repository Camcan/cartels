import React, {Component} from 'react';
import API from './api.js';
import Styles from './styles.css';
import Network from './network.js';
import ModeSelector from './modeSelector.js';
import Search from './search.js';
import CompanyProfile from './companyProfile.js';

const apiUrl = [
    'https://',
    'alfordgeo.co.nz', 
    ':8443/api/' 
].join('');

class NetworkContainer extends Component { 
	constructor(props){
		super(props);
		this.state = {
            companyList: [],
               activeList: [],
               companyRels: [],
               activeRels: [],
               filter: 'All',
               selectedCompany: null
        }
	}
	componentDidMount(){
      API.getRelationships(apiUrl, (data)=>{
        this.setState({
            companyList: data.companyList,
            activeList: data.companyList,
            companyRels: data.relationships,
            activeRels: data.relationships,
        });
      });
	}
	componentWillReceiveProps(newProps){
        this.setState({
             ...newProps
         });
	}
	render(){
         const profileClass = [
            Styles.companyProfile,
            (this.state.selectedCompany) ? Styles.active : ""
        ].join(" ");    
        return <div className={Styles.container}>
		    <div className={Styles.network}>
                <div className={Styles.modeSelector}>
                    <ModeSelector select={(filter)=>this.setState({filter: filter})}
                        options={["All"]}
                        active={this.state.filter}
                    />
                    <Search list={this.state.activeList}
                        active={this.state.selectedCompany}
                        handleSelection={(id)=>
                            this.setState({selectedCompany: id})
                        }
                    />
                </div>
                <Network 
                    background="linear-gradient(to right, #EEE, #FFF)"
                    height="100%"
                    data={this.state.activeList} 
                    rels={this.state.activeRels}
                    api={apiUrl}
                    selected={
                        (this.state.selectedCompany) ? [this.state.selectedCompany] 
                        : null
                    }
                    handleSelection={
                        (id)=>{
                            this.setState({selectedCompany: id});
                        }
                    } 
                />
            </div>
		    <div className={profileClass}>
                <CompanyProfile 
                    apiUrl={apiUrl}
                    companyList={this.state.companyList}
                    selectedCompany={this.state.selectedCompany}
                />
            </div>
        </div>
	
	}
};

export default NetworkContainer;
