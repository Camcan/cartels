import React, { Component } from 'react';
import Styles from './footer.css';

export default class ArtContainer extends Component {
   constructor(props){
      super(props)
   }
   render () {
      return (
               <div className={Styles.main}>
                  <div>
                     <a href="/login">Login</a>
                  </div>
                  <div className={Styles.creators}>
                     <p className={Styles.cpr}>
                        © {this.props.owner}
                     </p>
                     <p className={Styles.creator}>
                        site by <a href="http://github.com/camcan">camcan</a>
                     </p>
                  </div>
               </div>
            )
   }
}

