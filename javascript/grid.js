// These var control the size and scale of the grid
var gridLength = 1920; // The length along the x-axis of the grid (default: 500)
var gridHeight = 1920; // The height along the y-axis of the grid (default: 500)
var gridScale = 10; // The distance each square in the grid represents (default: 10)
var gridPos = 0; // The starting position of the grid (default: 0)

function drawGrid() // The function that draws the grid
	{
		context.beginPath(); // Starting the path
		for (var x = gridPos; x < gridLength + 1; x += gridScale) // A for loop that draws the vertical lines of the grid
		{
		  context.moveTo(x, gridPos); // Moves to the next x position along the top starting at the top left
		  context.lineTo(x, gridHeight); // Draws a line all the way down
		}

		for (var y = gridPos; y < gridHeight + 1; y += gridScale) // A for loop that draws the horizontal lines of the grid
		{
		  context.moveTo(gridPos, y); // Moves to the next y position along the left starting at the top left
		  context.lineTo(gridHeight, y); // Draws a line all the way to the right
		}
		context.strokeStyle = "#000000"; // Line colour = black
		context.stroke(); // Drawing everything

		context.beginPath(); // Starting the path
		context.moveTo(gridLength/2, 0); // Moves to the top middle
		context.lineTo(gridLength/2, gridHeight); // Draws a line down to bottom middle
		context.lineWidth = "2"; // Line width of 2
		context.strokeStyle = "#000000"; // Line colour = black
		context.stroke(); // Drawing everything

		context.beginPath(); // Starting the path
		context.moveTo(0, gridHeight/2); // Moves to left middle
		context.lineTo(gridLength, gridHeight/2); // Draws a line to right middle
		context.lineWidth = "2"; // Line width of 2
		context.strokeStyle = "#000000"; // Line colour = black
		context.stroke(); // Drawing everything
	}
