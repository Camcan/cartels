import React, { Component } from 'react';
import Styles from './footer.css';

export default class ArtContainer extends Component {
   constructor(props){
      super(props)
   }
   render () {
      return (
               <div className={Styles.main}>
                  <p className={Styles.cpr}>
                     © {this.props.owner}
                  </p>
                  <p className={Styles.creator}>
                     site by <a href="http://github.com/camcan">camcan</a>
                  </p>
               </div>
            )
   }
}

