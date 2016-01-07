var OrGate = (function (_super) 
{
	__extends(OrGate, _super);
	
    function OrGate() 
	{
		_super.call(this);
    }
	
    OrGate.prototype.draw = function () 
	{
		context.save(); // Saves all the context settings
		context.lineWidth = 5; // Sets line width to 5
		this.drawOrGate(); // Calls the function that draws the lines of the node
		context.restore(); // Restores all the context settings
		this.drawChildren(); // Calls the function that starts drawing this nodes children
    };
	
	OrGate.prototype.drawOrGate = function () // The function that draws the lines of the current node
	{
		orGatePos = new Vector(-100, 75); // A vector holding the highest position and the lowest position of the node
		
		context.beginPath(); // Starting the path
		context.moveTo(0, orGatePos.getX()); // Moves to the highest position
		
		context.bezierCurveTo
			(0, orGatePos.getX(), 
			orGatePos.getX(), orGatePos.getX()/2, 
			orGatePos.getX(), -orGatePos.getX()); // First part of the bezier curve, draws a curvy line down
			
		context.bezierCurveTo
			(-orGatePos.getY() + 10, orGatePos.getY() - 5, 
			orGatePos.getY() - 10, orGatePos.getY() - 5, 
			-orGatePos.getX(), -orGatePos.getX()); // Second part of the bezier curve, draws a curvy line from the bottom of the first to the bottom of the third
			
		context.moveTo(0, orGatePos.getX()); // Moves back to the highest position
		
		context.bezierCurveTo
			(0, orGatePos.getX(), 
			-orGatePos.getX(), orGatePos.getX()/2, 
			-orGatePos.getX(), -orGatePos.getX()); //Third part of the bezier curve, draws a curvy line down on the other side
			
		context.stroke(); // Drawing everything
		
		context.beginPath(); // Starting the path
		context.moveTo(0, orGatePos.getX()); // Moves to the highest position
		context.lineTo(0, orGatePos.getX() - 27.44445); // Draws a little line coming off it
		context.moveTo(0, orGatePos.getY()); // Moves to the lowest position
		context.lineTo(0, orGatePos.getY() + 50); // Draws a little line coming off it
		context.stroke(); // Drawing everything
	};
	
    return OrGate; // Returns the newly drawn OrGate
})(FaultTreeGate);
