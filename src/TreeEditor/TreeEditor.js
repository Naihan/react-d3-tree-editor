import React from "react";
import clone from 'clone';
import d3 from 'd3';
import './style.css'

export default class Depandancy extends React.Component {

    constructor(props) {
        super(props)

        this._data = clone(this.props.treeData);
        this._treeConfig = clone(this.props.treeConfig);

        this._tree = null;
        this._data.x0 = 0;
        this._data.y0 = 50;
        this._fontSize = null;
        this._imageSize = null;
        this._svg = null;
        this._nodeIdCounter = 0
        this._diagonal = null;
        this._svgWidth = null;
        this._svgHeight = null;
        this._textY = null;
        this._linkLength = null
        this._defaultImage = 'data:image/jpeg;charset=utf-8;base64,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';
        //expand context menu if handler submitted
        if (this.props.getContextMenu)
            this._expendD3Context();
    }
    async componentDidMount() {
        //this._rootNode.style.display = "none";
        await this._setParentRef(this._data);
        if (this.props.onRef)
            this.props.onRef(this);

        this._generateTree();
        this.update(this._data)

    }
    shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }
    _extractTreeData = (node) => {

        if (node._children != null) {
            node.children = node._children;
        }
        delete node._children;
        delete node.x;
        delete node.x0;
        delete node.y;
        delete node.y0;
        delete node.depth
        delete node.id;
        delete node.parent;

        if (node.children != null) {
            node.children.forEach(n => {
                this._extractTreeData(n)
            });
        }


    }
    _expendD3Context = () => {
        d3.contextMenu = (openCallback) => {
            // create the div element that will hold the context menu
            d3.selectAll('.d3-context-menu').data([1])
                .enter()
                .append('div')
                .attr('class', 'd3-context-menu');

            // close menu
            d3.select(this._rootNode).on('click.d3-context-menu', () => {
                d3.select('.d3-context-menu').style('display', 'none');
            });

            // this gets executed when a contextmenu event occurs
            return (data, index) => {
                var menu = this.props.getContextMenu(data);
                d3.selectAll('.d3-context-menu').html('');
                var list = d3.selectAll('.d3-context-menu').append('ul');
                list.selectAll('li').data(menu.filter(d => d.enabled)).enter()
                    .append('li')
                    .html((d) => {
                        return d.title;
                    })
                    .on('click', (d, i) => {
                        d.action(this, data, index);
                        d3.select('.d3-context-menu').style('display', 'none');
                        if (this.props.contextMenuClose)
                            this.props.contextMenuClose(data, index);

                    });

                if (this.props.contextMenuOpen)
                    this.props.contextMenuOpen(data, index);

                // display context menu
                d3.select('.d3-context-menu')
                    .style('left', (d3.event.pageX - 2) + 'px')
                    .style('top', (d3.event.pageY - 2) + 'px')
                    .style('display', 'block');

                d3.event.preventDefault();
            };
        };
    }
    _click = (d) => {

        //return if element has no children
        if (!d.children && !d._children)
            return;


        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d, 'click');
    }
    _setParentRef = (e) => {
        var objectChildren = e.children || e._children;
        if (objectChildren) {
            objectChildren.forEach(c => {
                c.parent = e;
                this._setParentRef(c);
            });
        }
    }
    _generateTree = () => {

        this._svgWidth = this._rootNode.offsetWidth - this._treeConfig.margin.right - this._treeConfig.margin.left;
        this._svgHeight = this._rootNode.offsetHeight - this._treeConfig.margin.top - this._treeConfig.margin.bottom;
        this._linkLength = Math.floor(this._svgWidth / 12);
        this._fontSize = Math.floor(this._svgWidth / 150)
        this._imageSize = Math.ceil(this._svgWidth / 60);
        this._textY = (this._imageSize + 4)
        this._tree = d3.layout.tree().nodeSize(this._treeConfig.nodeSize);

        this._diagonal = d3.svg.diagonal()
            .projection((d) => {
                return [d.y + this._imageSize / 2,
                    d.x + this._imageSize / 2
                ];
            });

        var zm = null;
        this._svg = d3.select(this._rootNode)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + this._svgWidth + " " + this._svgHeight)
            //class to make it responsive
            .classed("svg-content-responsive", true)
            .on('contextmenu', d => {
                d3.event.preventDefault();
            })
            .call(zm = d3.behavior.zoom().scaleExtent([1, 5]).on("zoom", this._redraw)).on("dblclick.zoom", null)
            .append("g")
            .attr("transform", "translate(" + 100 + "," + (this._svgHeight / 2) + ")")


        //necessary so that zoom knows where to zoom and unzoom from
        zm.translate([100, (this._svgHeight / 2)]);

        //collapse all 
        this.collapseAllElements(this._data)
        this.update(this._data);

        zm.scale(2)
        zm.event(this._svg)

        //indicate wrapper generate tree finished if handler specified
        if (this.props.treeRenderedCallback)
            this.props.treeRenderedCallback();

    }
    _redraw = () => {
        //Redraw for zoom
        this._svg.attr("transform",
            "translate(" + d3.event.translate + ")" +
            " scale(" + d3.event.scale + ")");
    }
    _setRef(componentNode) {
        this._rootNode = componentNode;
    }
    _getNodeRef = (source) => {
        var treeNodes = this._svg.selectAll("g.node")
        return treeNodes[0].filter((d) => {
            return d.__data__.id == source.id
        })[0];
    }
    getTreeData = () => {
        var tree = clone(this._data);
        this._extractTreeData(tree);
        return tree;
    }
    updateNodeText(e) {

        let currentNodeRef = this._getNodeRef(e);
        let nodeRef = currentNodeRef.children[2];

        if (this.props.filterTextName) {
            if (this.props.filterTextName(e) != nodeRef.innerHTML)
                nodeRef.innerHTML = this.props.filterTextName(e);
        } else {
            nodeRef.innerHTML = e.name;
        }
    }
    update = (source, action) => {

        // Compute the new tree layout.
        var nodes = this._tree.nodes(this._data).reverse();
        var links = this._tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach((d) => {
            d.y = (d.depth * this._linkLength);
        });

        // update the nodes…
        var node = this._svg.selectAll("g.node")
            .data(nodes, (d) => {
                return d.id || (d.id = ++this._nodeIdCounter);
            });


        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", (d) => {
                return "translate(" + (source.y0) + "," + (source.x0) + ")";
            })
            .on('contextmenu', (this.props.getContextMenu) ? d3.contextMenu() : null)
            .on("click", this._click)

        //append image, if no image handler specified. default
        nodeEnter.append("image")
            .attr("xlink:href", d => (this.props.selectImageLink) ? this.props.selectImageLink(d) : this._defaultImage)
            .attr("width", this._imageSize)

        //append a circle that indicates that has children
        nodeEnter
            .append("circle")
            .attr("cx", this._svgWidth / 356)
            .attr("cy", this._svgWidth / 356)
            .attr("r", this._svgWidth / 712)
            .style("stroke", "#2A4B7C")
            .style("visibility", "hidden")
            .filter(d => {
                return d.children || d._children
            })
            .filter(d => {
                return d._children
            })
            .style("fill", '#2A4B7C')
            .style("visibility", "visible")


        if (action) {
            let currentNodeRef = this._getNodeRef(source);
            let circleRef = currentNodeRef.children[1];
            if (action === 'click') {
                if (source.children)
                    circleRef.style.fill = null;
                else
                    circleRef.style.fill = '#2A4B7C';
            }
            if (action === 'add') {

                //append circle
                if (circleRef.style.visibility == 'hidden')
                    circleRef.style.visibility = 'visible';

            }
            if (action === 'remove' || action === 'removeChildren') {

                let parent;
                //get the parent ref
                if (action == 'removeChildren')
                    parent = source;
                else
                    parent = source.parent;

                if (!parent.children && !parent._children) {

                    let parentNodeRef = this._getNodeRef(parent);
                    parentNodeRef.children[1].style.visibility = 'hidden';
                }

            }
        }

        nodeEnter.append("text")
            .attr("x", Math.ceil(this._imageSize / 2))
            .attr("y", this._textY)
            .attr("dy", ".60em")
            .attr("text-anchor", "middle")
            .text((d) => {
                return (this.props.filterTextName) ? this.props.filterTextName(d) : d.name;
            })
            .style("font-size", (d) => {
                return this._fontSize + "px"
            })
        // .style("font-weight", "bold")


        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(this._treeConfig.duration)
            .attr("transform", (d) => {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("image")
            .attr("width", this._imageSize)


        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(this._treeConfig.duration)
            .attr("transform", (d) => {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .attr("width", this._imageSize)
            .remove();

        nodeExit.select("image")
            .attr("width", this._imageSize)

        // Update the links…
        var link = this._svg.selectAll("path.link")
            .data(links, (d) => {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", (d) => {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return this._diagonal({
                    source: o,
                    target: o
                });
            });

        // Transition links to their new position.
        link.transition()
            .duration(this._treeConfig.duration)
            .attr("d", this._diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this._treeConfig.duration)
            .attr("d", (d) => {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return this._diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    collapseAllElements = (e) => {
        if (e.children) {
            e._children = e.children;
            delete e.children;

            e._children.forEach(e => this.collapseAllElements(e));
        }
    }
    expandAllElements = (e) => {
        if (e._children) {
            e.children = e._children;
            delete e._children;

            e.children.forEach(e => this.expandAllElements(e));
        }
    }
    removeNode = (d) => {
        if (d.parent == undefined) {
            console.log("cannot delete a root level object");
        }

        var isUpdateNeeded = true;
        var parentChildrenRef = null;

        if (d.parent.children) { //open and displayed
            var parentChildrenRef = d.parent.children;
        } else if (d.parent._children && !d.parent.children) { //closed
            isUpdateNeeded = false;
            parentChildrenRef = d.parent._children;
        } else {
            console.log("not found");
        }

        //get the index of the element
        var index = parentChildrenRef.indexOf(d);
        //remove the element
        if (index > -1) {
            parentChildrenRef.splice(index, 1);
            if (isUpdateNeeded)
                this.update(d, 'remove');
        }
        if (this.props.treeNodeAction)
            this.props.treeNodeAction('removeNode');
    }
    removeChildren = (d) => {
        d.children = undefined;
        d._children = undefined;
        this.update(d, 'removeChildren');
        if (this.props.treeNodeAction)
            this.props.treeNodeAction('removeChildren');
    }
    addNode = (d, nodeInfo) => {
        //collapse the node 
        this.collapseAllElements(nodeInfo)

        //add the parent if node is not displayed 
        nodeInfo.parent = d;


        if (d.children == undefined)
            d.children = d._children || []
        d.children.push(nodeInfo);
        this.update(d, 'add');

        if (this.props.treeNodeAction)
            this.props.treeNodeAction('add');
    }
    render() {
        return (<div ref = {this._setRef.bind(this)} className='svg-container'/>)
    }
}