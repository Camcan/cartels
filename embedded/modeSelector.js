import React, {Component} from 'react';
import Styles from './modeSelector.css';


class ModeSelector extends Component { 
	constructor(props){
		super(props);
		this.state = {
		    ...props
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
    _renderOptions(options, current){
       return options.map((o)=>{
             return (
                 <a className={(o == current) ? "is-active" : null}
                    onClick={()=>this.props.select(o)}
                 > 
                    {o}
                 </a>
            )
       });
    } 
    render(){
        return (
            <div className={Styles.container}>
                <p>Show: </p>
                { 
                  this._renderOptions(
                    this.props.options, 
                    this.props.active
                  )
                }
            </div>
        );
    }
};

export default ModeSelector;


