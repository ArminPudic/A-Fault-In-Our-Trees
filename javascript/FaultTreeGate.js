var FaultTreeGate = (function (_super) 
{
	__extends(FaultTreeGate, _super);
	
    function FaultTreeGate(pPosition) 
	{
		_super.call(this);
        this.mChildren = new Array();
    }
	
    FaultTreeGate.prototype.getChild = function (pIndex) 
	{
        return this.mChildren[pIndex];
    };
	
	FaultTreeGate.prototype.numChildren = function () 
	{
        return this.mChildren.length;
    };
	
    FaultTreeGate.prototype.addChild = function (pChild) 
	{
        this.mChildren.push(pChild);
    };
	
	FaultTreeGate.prototype.drawChildren = function () // The function that is called when a node draws it's children
	{
		var totalSubTreeWidth = this.subTreeWidth(); // Starts by getting the total width of the current sub tree by calling the subTreeWidth function
		var previousChildWidth = 0; // Sets the previousChildWidth to 0
		for (var i = 0; i < this.numChildren(); i += 1) // Loops through all the current nodes children
		{
			context.save(); // Saves all the context settings
			
			var child = this.getChild(i); // Gets the current child
			var childWidth = child.subTreeWidth(); // Runs the function that works out the total width of the sub tree with this child as the current node
			nodeLocation = new Vector (-totalSubTreeWidth/2 + childWidth/2  + previousChildWidth, 250); // A vector that holds the location for the current node
			lineLocation = new Vector (totalSubTreeWidth/4 - childWidth/4 - previousChildWidth/4, 125); // A vector that holds the location for the lines
			
			context.lineWidth = 5; // Sets line width to 5
			context.moveTo(nodeLocation.getX(), nodeLocation.getY()/2); // Moves to the top middle of the left most node of the current sub tree
			context.lineTo(lineLocation.getX(), lineLocation.getY()); // Draws a line to the top middle of the right most node of the current sub tree
			context.stroke(); // Draws everything
			
			context.translate(nodeLocation.getX(), nodeLocation.getY()); // Translates the context ready for the child to be drawn 
																	     //(node spacing). It starts in the left most coordinate of the 
																	     //current sub tree then adds the width of the child and then 
																	     //adds the width of the number of previous children drawn
			
			child.draw(); // Runs the draw function of the current child
			previousChildWidth += childWidth; // Updates the previous child width
			
			context.restore(); // Restores all the context settings
		} 
		
	};

	FaultTreeGate.prototype.subTreeWidth = function () // The function that calculates the total width of the current sub tree
	{
		var width = 0; // Starts by setting the width to 0
		for (var i = 0; i < this.numChildren(); i += 1) // Loops through all the children of the current node
		{
			width += this.getChild(i).subTreeWidth(); // Recursive loop, keeps looping until hits leaf node. When hits leaf node it runs the override code in BasicEvent or TransferGate and returns the set width value
		}
		return width; // Returns the width of the sub tree
	};
	
	/*
	FaultTreeGate.prototype.treeDepth = function ()
	{
		if (depth > maxDepth)
		{
			maxDepth = depth;
		}
		depth = 0;
		if (this.mChildren)
		{
			for (var i = 0; i < this.numChildren(); i += 1)
			{
				depth += 1;
				this.mChildren[i].treeDepth();
			}
		}
		else
		{
			maxDepth = 0;
		}
		console.log(maxDepth);
		return maxDepth;
	};
	*/
	
    return FaultTreeGate; // Returns the FaultTreeGate
})(FaultTreeNode);
