import React, { Component } from 'react';
import vis from 'vis';

export default class Network extends Component {
   constructor(props){
      super(props);
      this.drawNetwork = this.drawNetwork.bind(this);
   }
   componentDidMount(){
   	this.drawNetwork(this.props.data, this.props.rels)
   }
   drawNetwork(data, rels){ 
         let width = 67;
         const nodes = data.map((co)=>{
            width += 20;
            const imageUrl =(co.logoUrl) ? conf.baseUrl + co.logoUrl : 'http://placekitten.com/' + width + '/140';
            console.log(imageUrl);
            return {
               id: co._id, 
               label: co.name,
               shape: 'circularImage', 
               image: imageUrl            
            }
         }) 
         let edges = rels;
         let network = null;
         
    const draw = (nodes, edges)=> {
        const DIR = '.';
        const container = document.getElementById('mynetwork');
        const data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            interaction:{
                dragNodes:true,
                dragView: true,
                hideEdgesOnDrag: false,
                hideNodesOnDrag: false,
                hover: true,
		        hoverConnectedEdges: true,
		        keyboard: {
		            enabled: false,
		            speed: {x: 10, y: 10, zoom: 0.02},
		            bindToWindow: true
		        },
		        multiselect: false,
		        navigationButtons: true,
		        selectable: true,
		        selectConnectedEdges: true,
		        tooltipDelay: 300,
		        zoomView: true
		    },
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
        return new vis.Network(container, data, options);
    };
    this.network = draw(nodes, edges);
    this.network.on('click', (pros)=>{
        var ids = pros.nodes;
        ids = (ids.length > 0) ? ids[0] : null;
		this.props.handleSelection(ids);
	});
   } 
   componentWillReceiveProps(newProps){
       console.log("NETWORK RECEIVING PROPS", newProps);
        if (newProps.data != this.props.data || newProps.rels != this.props.rels) { 
           console.log("REDRAWING IT ALL")
            this.drawNetwork(
                newProps.data || this.props.data,
                newProps.rels || this.props.rels
            );
        } else (newProps.selected) ? this.network.selectNodes(newProps.selected) : console.log("No selection");
   }
    render(){
      return (
               <div id="mynetwork" style={{
                   height: this.props.height || "500px", 
                   background: this.props.background || "#eee"}}></div>
      )
   }
}

