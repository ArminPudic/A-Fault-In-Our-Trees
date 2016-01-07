var TransferGate = (function (_super) 
{
	__extends(TransferGate, _super);
	
    function TransferGate() 
	{
		_super.call(this);
    }
	
	TransferGate.prototype.subTreeWidth = function () // The overriding function for the TransferGates 
	{
		var width = 175; // Sets the width to 175
		return width; // And returns it
	};
	
	TransferGate.prototype.treeDepth = function ()
	{
		depth += 1;
		return depth;
	};
	
    TransferGate.prototype.draw = function () 
	{
		context.save(); // Saves all the context settings
		context.lineWidth = 5; // Sets line width to 5
		context.rotate(-Math.PI/2); // Rotates the the transfer gate so the triangle points upwards
		this.drawTransferGate(); // Calls the function that draws the lines of the node
		context.restore(); // Restores all the context settings
    };
	
	TransferGate.prototype.drawTransferGate = function () // The function that draws the lines of the current node
	{	
		var originX = 0; // The x origin of the triangle
		var originY = 0; // The y origin of the triangle
		var lineSegments = 3; // The number of line segments in the triangle
		var radius = 100; // The radius of the triangle
		
		var highestPos = 100; // Sets the lowest position of the node
			
		context.beginPath(); // Starting the path
		context.strokeStyle = '#000000'; // Sets the colours of the lines to black
		var lineSegmentAngle = Math.PI * 2 / lineSegments; // Creates the angle of the line segments from the number of line segments multiplied by 360 degrees
		for (var i = 0; i <= lineSegments; i += 1) // A loop that goes through and draws each line segment
		{
			var currentAngle = lineSegmentAngle * i; // Sets the current angle to the predetermined line segment angle multiplied by the current segment
			var x = originX + radius * Math.cos(currentAngle); // This sets the current x value to the origin plus the radius multiplied by the angle
			var y = originY + radius * Math.sin(currentAngle); // This sets the current y value to the origin plus the radius multiplied by the angle
			if (i == 0) // If it is starting the draw and it is on the first segment (i = 0)
			{
				context.moveTo(x, y); // Then move to the first x and y coordinate predetermined above
			}
			else // Otherwise
			{
				context.lineTo(x, y); // Draw a line to the next coordinate creating a line segment
			}
		}
		context.stroke(); // Drawing everything
		
		context.beginPath(); // Starting the path
		context.moveTo(highestPos, 0); // Moves to the lowest position
		context.lineTo(highestPos + 25, 0); // Draws a little line coming off it
		context.stroke(); // Drawing everything
	};
	
    return TransferGate; // Returns the newly drawn TransferGate
})(FaultTreeNode);
