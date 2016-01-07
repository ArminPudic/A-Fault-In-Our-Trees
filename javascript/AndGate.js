var AndGate = (function (_super) 
{
	__extends(AndGate, _super);
	
    function AndGate() 
	{
		_super.call(this);
    }
	
    AndGate.prototype.draw = function () // AndGate draw function
	{
		context.save(); // Saves all the context settings
		context.lineWidth = 5; // Sets line width to 5
		this.drawAndGate(); // Calls the function that draws the lines of the node
		context.restore(); // Restores all the context settings
		this.drawChildren(); // Calls the function that starts drawing this nodes children
    };
	
	AndGate.prototype.drawAndGate = function () // The function that draws the lines of the current node
	{
		var andGatePos = new Vector(-100, 95); // Creates a vector with the highest position and the lowest position of the node
		
		context.beginPath(); // Starting the path
		context.arc(0, 0, -andGatePos.getX(), 0, Math.PI, true); // Draws the initial arc at point 0, 0 with a size of 100 in a semi circle rotation (180 degrees)
		context.lineTo(andGatePos.getX(), andGatePos.getY()); // Draws a line from the arc to the lowest position
		context.lineTo(-andGatePos.getX(), andGatePos.getY()); // Draws a line from the lowest position to the left
		context.lineTo(-andGatePos.getX(), 0); // Draws a line from the left to the top (back to the arc)
		context.stroke(); // Drawing everything
		
		context.beginPath(); // Starting the path
		context.moveTo(0, andGatePos.getX()); // Moves to the highest position
		context.lineTo(0, andGatePos.getX() - 27.44445); // Draws a little line coming off it
		context.moveTo(0, andGatePos.getY()); // Moves to lowest position
		context.lineTo(0, andGatePos.getY() + 30); // Draws a little line coming off it
		context.stroke(); // Drawing everything
	};
	
    return AndGate; // Returns the newly drawn AndGate
})(FaultTreeGate);
