import React, { Component } from 'react';
import vis from 'vis';
import API from '../../utils/api.js';

export default class Network extends Component {
   constructor(props){
      super(props)
   }
   drawNetwork(){ 
      var DIR = 'img/soft-scraps-icons/';
      
      API.getRelationships((data)=>{
         console.log(data);
         let width = 67;
         const nodes = data.companyList.map((co)=>{
            width += 20;
            return {
               id: co._id, 
               label: co.name,
               shape: 'circularImage', 
               image: 'http://placekitten.com/' + width + '/140'
            }
         }) 
         let edges = data.relationships;
         let network = null;
         
         function draw(nodes, edges) {
            var DIR = '.';
            var container = document.getElementById('mynetwork');
            var data = {
               nodes: nodes,
               edges: edges
            };
            var options = {
               nodes: {
                  borderWidth:4,
                  size:30,
                  color: {
                     border: '#222222',
                     background: '#666666'
                  },
                  font:{color:'#000'}
               },
               edges: {
                  color: 'lightgray'
               }
            };
            new vis.Network(container, data, options);
         };
         draw(nodes, edges);
      });
   }
   render(){
      setTimeout(()=>this.drawNetwork(), 100)
      return (
            <div>
               {this.props.children}
               <div id="mynetwork" style={{height: '500px', background: "#eee"}}></div>
            </div>
      )
   }
}

