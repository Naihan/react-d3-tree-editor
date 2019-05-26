import './overrides.css'
import React from 'react';
import ReactDOM from 'react-dom';
import TreeEditor from '../src/index'



class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.treeRef = null;

        this.treeData = {
            //the actual data
            name: 'Root Node',
           
            children: [
                {
                    name: 'b'
                },{
                name: 'c',
                children: [{
                    name: 'child node',
                    children: [{
                        name: 'child node',
                        children: [{
                            name: 'child node',
                        }]
                    }]
                }]
            }, {
                name: 'child node',
                children: [{
                    name: 'child node',
                    children: [{
                        name: 'child node',
                        children: [{
                            name: 'child node',
                        }]
                    },
                    {
                        name: 'child node',
                        children: [{
                            name: 'child node',
                        }]
                    },
                    {
                        name: 'child node',
                        children: [{
                            name: 'child node',
                            
                        }]
                    }]
                }]
                
            }]
        }
        this.treeConfig = {
            //the d3 tree config 
            margin: {
                top: 20,
                right: 120,
                bottom: 20,
                left: 120
            },
            textMargin: 20,
            duration: 750,
            nodeSize: [40, 70]
        }
    }


    addElementModel = (d) => {
        //will be fired for opening a model edit node data
    }


    filterTextName = (d) => {
        //will be fired for each element once to decide which propery be used to display the name 
        return d.name;
    }


    contextMenuOpen = (d) => {
        //will be fired when context menu opended
    }

    contextMenuClose = (d) => {
        //will be fired when context menu closed
    }

    selectImageLink = (d) => {
        //will be fired once for each element to decide the icon for that element
        return "http://mojedelo.webfactional.com/img/ikone/mdikona4.png"
    }

    getContextMenu = (e) => {
        //will be fired on each element for attaching a context menu
        return [{
                title: 'Add Item',
                action: () => {
                    this.treeRef.addNode(e, {
                        name: 'new node'
                    })
                },
                enabled: true
            },
            {
                title: 'Delete Item',
                action: () => {
                    this.treeRef.removeNode(e);
                },
                enabled: true
            },
            {
                title: 'Delete Children',
                action: () => {
                    this.treeRef.removeChildren(e);
                },
                enabled: true
            },
            {
                title: 'Expand All',
                action: () => {
                    this.treeRef.expandAllElements(e);
                    this.treeRef.update(e);
                },
                enabled: true
            },
            {
                title: 'Collapse All',
                action: () => {
                    this.treeRef.collapseAllElements(e);
                    this.treeRef.update(e);
                },
                enabled: true
            },

        ];
    }

    treeRenderedCallback = (d) => {
        //will be fired when tree finish render
    }
    render() {
        return (
        <TreeEditor treeData={this.treeData}
            treeConfig={this.treeConfig}
            onRef={ref => (this.treeRef = ref)}
            addElementModel={this.addElementModel}
            filterTextName={this.filterTextName}
            contextMenuOpen={this.contextMenuOpen}
            contextMenuClose={this.contextMenuClose}
            selectImageLink={this.selectImageLink}
            getContextMenu={this.getContextMenu}
            treeRenderedCallback={this.treeRenderedCallback}/>
        )
    }
}


(async () => {
    ReactDOM.render( <App /> ,
    document.getElementById('app')
    )
})();


