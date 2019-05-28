import './overrides.css'
// import '../src/TreeEditor/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import TreeEditor from '../src/TreeEditor/TreeEditor';

var req = require.context("./", false, /\.(png)$/);
req.keys().forEach(function(key){ 
    req(key);
});


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            treeCurrentData: ""
        }
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
        return "img/sample.png"
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
    treeNodeAction = (action) => {
        //will be fired in every tree action
        console.log(action);
        let { treeCurrentData } = this.state;
        treeCurrentData =  JSON.stringify(this.treeRef.getTreeData(), null, 2);
       
        this.setState({
            treeCurrentData
            }
        )
    }
    treeRenderedCallback = () => {
        //will be fired when tree finish render
        let { treeCurrentData } = this.state;
        treeCurrentData =  JSON.stringify(this.treeRef.getTreeData(), null, 2);
       
        this.setState({
            treeCurrentData
            }
        )
    }
    render() {
        console.log(this.state.treeCurrentData)
        return (
            <div>
                 <TreeEditor treeData={this.treeData}
                    treeConfig={this.treeConfig}
                    onRef={ref => (this.treeRef = ref)}
                    addElementModel={this.addElementModel}
                    filterTextName={this.filterTextName}
                    contextMenuOpen={this.contextMenuOpen}
                    contextMenuClose={this.contextMenuClose}
                    selectImageLink={this.selectImageLink}
                    getContextMenu={this.getContextMenu}
                    treeRenderedCallback={this.treeRenderedCallback}
                    treeNodeAction={this.treeNodeAction}/>

                    <textarea rows="4" cols="50" value={this.state.treeCurrentData}></textarea>
            </div>
       
        )
    }
}


(async () => {
    ReactDOM.render( <App /> ,
    document.getElementById('app')
    )
})();


