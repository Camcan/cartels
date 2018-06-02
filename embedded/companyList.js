import React, {Component} from 'react';

import Styles from './companyList.css';


class CompanyList extends Component { 
	constructor(props){
		super(props);
		this.state = {
            list: props.list || null,
            active: props.active || null
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
    render(){
         if (this.state.list) return (
            <div className={Styles.container}>
                {this.state.list.map((x)=>{
                    return (
                        <a className={[
                                Styles.child,
                                (x._id == this.state.active) ? Styles.active : null
                            ].join(" ")}
                            onClick={()=>this.props.select(x._id)}
                        >
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
                })}

             </div>
        )
    }
};

export default CompanyList;
