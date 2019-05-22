# react-d3-tree-editor

React d3 editor is a d3 tree based editor, fully featured with context menu support. 
You can dynamicly edit, create and delete chiled nodes. nodes are based on icons you provide for styling.

> 

[![NPM](https://img.shields.io/npm/v/react-d3-tree-editor.svg)](https://www.npmjs.com/package/react-d3-tree-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Contents <!-- omit in toc -->
- [Demo](#demo)
- [Install](#install)
- [Basic Usage](#basic-usage)
- [Fully Featured Usage](#fully-featured-usage)
- [Props](#props)
- [Context Menu](#context-menu)
- [License](#license)


## Install

```bash
npm install --save react-d3-tree-editor
```

## Basic Usage

```jsx
import React, { Component } from 'react'
import TreeEditor from 'react-d3-tree-editor'

export default class App extends Component {

  constructor() {
    
    //the actual tree data
    this.treeData = {
        name: 'Root Node',
        
        children: [{
            name: 'new node'
            
        }, {
            name: 'new node'
        }]
    }

    //the d3 tree config 
    this.treeConfig = {
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
  render() {
    return (
      return (
        <TreeEditor treeData={this.treeData}
            treeConfig={this.treeConfig}/>
        )
    )
  }
}
```
## Fully Featured Usage
```jsx
  class App extends React.Component {

      constructor(props) {
          super(props);
          
          this.treeRef = null;

          this.treeData = {
              //the actual data
              name: 'Root Node',
            
              children: [{
                  name: 'new node'
                  
              }, {
                  name: 'new node'
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

      filterTextName = (d) => {
          //will be fired for each element once to decide which propery be used to display the name 
          return d.name;
      }


      contextMenuOpen = (d) => {
          console.log('contextMenuOpen');
          //will be fired when context menu opended
      }

      contextMenuClose = (d) => {
          console.log('contextMenuClose');
          //will be fired when context menu closed
      }

      selectImageLink = (d) => {
          //will be fired once for each element to decide the icon for that element
          return "http://mojedelo.webfactional.com/img/ikone/mdikona4.png"
      }

      getContextMenu = (e) => {
          //will be fired on each element for attaching a context menu
          return [{
                  title: 'add Item',
                  action: () => {
                      this.treeRef.addNode(e, {
                          name: 'new node'
                      })
                  },
                  enabled: true
              },
              {
                  title: 'Delete Item',
                  action: (e) => {
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
          console.log('treeRenderedCallback');
          //will be fired when tree finish render
      }
      render() {
          return (
          <TreeEditor treeData={this.treeData}
              treeConfig={this.treeConfig}
              onRef={ref => (this.treeRef=ref)}
              filterTextName={this.filterTextName}
              contextMenuOpen={this.contextMenuOpen}
              contextMenuClose={this.contextMenuClose}
              selectImageLink={this.selectImageLink}
              getContextMenu={this.getContextMenu}
              treeRenderedCallback={this.treeRenderedCallback}/>
          )
      }
  }

```

## Props
|Prop name|Mandatory|DefaultValue|Description|
|:-|:-:|:--------:|:-|
|treeData|true|N/A|The actual d3.tree data.<br/> you can append any data to a node and it will be avalable.<br/> Each child node should be a part 
of node.children array. <br/> Nodes contain an 'id' attribute which you can either manage by yourself or let the tree manage it automaticly. 
|getTreeData|false|N/A|Returns the tree data
|treeConfig| true|N/A| The d3 tree configuration
|onRef|false|N/A|executed when the tree is first generated, the purpose of this callbact is to give the developer the tree referance for lated use
|filterTextName|false|name|will be fired for each element once to decide which attribute be used to display the name of the element. <br/> If not implemented, the tree will assume that the 'name' attribute will be used
|contextMenuOpen|false|N/A|will be fired when context menu opended
|contextMenuClose|false|N/A|will be fired when context menu closed
|selectImageLink|false|N/A|will be fired once for each element to decide the icon for that element.<br/>If not specified a default image will be presented.
|getContextMenu|false|N/A|will be fired on each element for attaching a context menu, see Context Menu for details
|treeRenderedCallback|false|N/A|Will be fired when tree finish render

#Context Menu

Context menu is an object array that each object consist of the following properties

- title: the title of the option that will be displayed
- enabled: (bool) will it be enabled or not.
- action: the action that will be executed on the tree node



```js
    [
      {
        title: 'Collapse All',
        action: () => {
            this.treeRef.collapseAllElements(e);
            this.treeRef.update(e);
        },
        enabled: true
      }
    ]
```

## License

MIT © [http://github.com/Naihan/react-tree-dependancy](https://github.com/http://github.com/Naihan/react-tree-dependancy)
