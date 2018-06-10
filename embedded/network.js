import React, { Component } from 'react';
import vis from 'vis';

export default class Network extends Component {
   constructor(props){
      super(props);
      this.drawNetwork = this.drawNetwork.bind(this);
   }
   componentDidMount(){
        this.drawNetwork(this.props.data, this.props.rels);
       this.setState({
            nodeIds: this.props.data.map((i)=>{
                return i._id
            })
        })
   }
   drawNetwork(data, rels){ 
         let width = 67;
         const nodes = data.map((co)=>{
            width += 20;
            const imageUrl =(co.logoUrl) ? this.props.api + co.logoUrl : 'http://placekitten.com/' + width + '/140';
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
                    background: '#eee'
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
        ids = (ids[0]) ? ids[0] : null;
		this.props.handleSelection(ids);
	});
   } 
   componentWillReceiveProps(newProps){
        if (newProps.data != this.props.data || newProps.rels != this.props.rels) { 
            this.drawNetwork(
                newProps.data || this.props.data,
                newProps.rels || this.props.rels
            );
            this.setState({
                nodeIds: newProps.data.map((i)=>{return i._id})
            });
        } else if (newProps.selected != this.props.selected) {
            const animation = {
                animation: {
                    duration: 300,
                    easingFunction: 'easeOutQuad'
                }
            };
            if (newProps.selected) {
                this.network.selectNodes(newProps.selected);
                this.network.fit({
                    nodes: newProps.selected,    
                    ...animation
                }) 
            } else {
                this.network.fit(animation);
            };
        };
    }
    render(){
      return (
               <div id="mynetwork" style={{
                   height: this.props.height || "500px",
                   width: this.props.width || "inherit",
                   background: this.props.background || "#eee"}}></div>
      )
   }
}

