# A Fault in Our Trees

An online Fault Tree viewer made using html and mainly JavaScript. It allows you to view 3 different fault trees (with the possibility of adding more). The positions and gates used for each fault tree is calculated using a "family tree" system. Each tree has its TopNode followed by its child nodes. Each node has a gate applied to it and when the tree is drawn all nodes have their specific gates and positions based on their hierarchy. The translation algorithm goes through each child to find the width of the tree. It then calculates the total width of all the previous nodes and adds half the width of itself due to the origin point of the node.

The viewer allows you to switch between the fault trees, switch to a home page and more info page, has a dynamic minimap that includes field of view and allows you to dynamically resize the window. You can zoom in and out, with partial zoom to mouse functionality, and pan around each fault tree.
