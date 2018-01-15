import React, { Component } from 'react';
import { pages } from '../../config/admin.js';
export default class Menu extends Component {
   constructor(props){ 
      super(props);
      this.state = {
         ...props
      }
   }
   componentWillMount(){
      console.log(pages)
   }
   componentWillReceiveProps(newProps){

   }
   render(){
      return (
         <aside className="menu">
            {
               pages.map((e)=>{
                  return (
                     <div>
                        <p className="menu-label">
                           {e.label}
                        </p>
                        <ul className="menu-list">
                           { 
                              e.items.map((i)=>{
                                 let activeClass = (this.props.selected == i) ? "is-active" : "";
                                 return <li onClick={()=>this.props.selectPage(i)}>
                                    <a className={activeClass}>{i}</a>
                                 </li>
                              })
                           }
                        </ul>
                     </div>
                  )
               })
            }
         </aside>
      );
   }
}
