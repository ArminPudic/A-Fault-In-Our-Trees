var BasicEvent = (function (_super) 
{
	__extends(BasicEvent, _super);
	
    function BasicEvent() 
	{
		_super.call(this);
    }
	
	BasicEvent.prototype.subTreeWidth = function () // The overriding function for the BasicEvents 
	{
		var width = 175; // Sets the width to 175
		return width; // And returns it
	};
	
	BasicEvent.prototype.treeDepth = function ()
	{
		depth += 1;
		return depth;
	};
	
    BasicEvent.prototype.draw = function () 
	{
		context.save(); // Saves all the context settings
		context.lineWidth = 5; // Sets line width to 5
		this.drawBasicEvent(); // Calls the function that draws the lines of the node
		context.restore(); // Restores all the context settings
    };
	
	BasicEvent.prototype.drawBasicEvent = function () // The function that draws the lines of the current node
	{		
		var originX = 0; // The x origin of the circle
		var originY = 0; // The y origin of the circle
		var lineSegments = 20; // The number of line segments in the circle
		var radius = 75; // The radius of the circle
		
		var highestPos = -75; // Sets the highest position of the node
		
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
		context.moveTo(0, highestPos); // Moves to the highest position
		context.lineTo(0, highestPos - 52.4444445); // Draws a little line coming off it
		context.stroke(); // Drawing everything
	};
	

    return BasicEvent; // Returns the newly drawn BasicEvent
})(FaultTreeNode);
