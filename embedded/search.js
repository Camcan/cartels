import React, {Component} from 'react';
import Styles from './search.css';
import CompanyList from './companyList.js';

class Search extends Component { 
	constructor(props){
		super(props);
		this.state = {
		    ...props,
            results: null,
            filter: null
        }
	}
	componentDidMount(){
	
    }
	componentWillReceiveProps(newProps){
         if (this.props != newProps) {
             this.setState({
                 ...newProps
            });
         }
	}
    handleChange(e){
        const v = e.target.value;
        if (v != this.state.filter) {
            this.setState({filter: v});
            filterList(this.state.list, v);
        }
    }
    filterList(list,filter){
        const filteredList = list.map((item)=>{
                if (item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1){
                    return item;
                };
            });
        this.setState({results: filteredList})
    }
    _renderResults(){
       if (this.state.results){
           return <CompanyList list={this.state.results} 
                        active={this.props.active}
                        select={(i)=>this.props.handleSelection(i)}
                    />
    } 
    render(){
        return (
            <div className={Styles.container}>
                <input className="input"
                    type="text" 
                    onChange={
                        this.handleChange.bind(this)
                    } 
                    autofocus="true" 
                    name="autofocus search" 
                    placeholder={
                        this.props.placeHolder || "Search..."
                    } 
                ></input>
                <div className={Styles.results">
                    {this._renderResults(this.props.list, this.state.filter)}
                </div>
            </div>
        );
    }
};

export default ModeSelector;


