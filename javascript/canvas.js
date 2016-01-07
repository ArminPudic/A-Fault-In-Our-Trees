// check to see if the browser supports
// the addEventListener function
if(window.addEventListener)
{
	window.addEventListener
	(
		'load', // this is the load event
		onLoad, // this is the event handler we are going to write
		false // useCapture boolean value
	);
}

window.context; // Global context variable (makes it a little easier/more convenient 

window.onscroll = function () // A function that sets the window position at the top middle
{ 
	window.scrollTo(canvas.width * 0.25, -canvas.height); // The actual code that sets the window position at the top middle
};

// The window load event handler
function onLoad()
{
	// Variables
	var exampleFaultTree, faultTreeNum, pan, previousMousePos, mousePos; // Several key temporarily undefined variables
	
	var canvas = document.getElementById('canvas'); // My canvas variable
	
	// Screenshot variables
	var screenshot1 = document.getElementById("screenshot1"); // Uses the screenshots referenced in index and sets them in variables
	var screenshot2 = document.getElementById("screenshot2");
	var screenshot3 = document.getElementById("screenshot3");
	var screenshot4 = document.getElementById("screenshot4");
	var screenshot5 = document.getElementById("screenshot5");
	var screenshot6 = document.getElementById("screenshot6");
	var screenshot7 = document.getElementById("screenshot7");
	var screenshot8 = document.getElementById("screenshot8");
	
	var scale = 0.2; // Zoom scale variable, 0.2 is the starting scale value
	var previousScale = 0.2;
	var mouseRoll = 0; // Mouse roll delta value
	var xTranslate = 20; // The x scroll value for the more info screen
	var yTranslate = canvas.height * 0.1; // The y scroll value for the more info screen
	var depth = 0;
	
	var restrictTransformation = true; // Variable to determine whether or not the transformation code will be restricted
	var mouseDown = false; // Whether the mouse click is down or not
	var moreInfoScroll = false; // A bool to check see if the more info page was opened
	var dynamicSize = false; // A bool to check see if you are in dynamic resize mode or not
	
	document.documentElement.style.overflow = 'hidden'; // Removes the scroll bars on the page
	
	// this function will initialise our variables
	function initialise()
	{
		// Find the canvas element using its id attribute.
		canvas = document.getElementById('canvas');
		// if it couldn't be found
		if (!canvas)
		{
			// make a message box pop up with the error
			alert('Error: I cannot find the canvas element!');
			return;
		}
		// check if there is a getContext function
		if (!canvas.getContext)
		{
			// make a message box pop up with the error
			alert('Error: No canvas.getContext!');
			return;
		}
		// Get the 2D canvas context
		context = canvas.getContext('2d');
		if (!context)
		{
			alert('Error: Failed to getContext!');
			return;
		}
		
		exampleFaultTree = new ExampleFaultTrees(); // New instance of ExampleFaultTrees()
		
		pan = new Vector(canvas.width/2, canvas.height/2); // Creates the pan vector
		previousMousePos = new Vector(event.clientX, event.clientY); // Creates the previous mouse position vector
	}
	
	function eventHandlers() // The event handler function that handles key presses and mouse presses/movement
	{
		if (window.addEventListener) // The key press event listener 
		{
			window.addEventListener('keydown', onKeyDown, false); // Key pressed
		}
		
		if (canvas.addEventListener) // The mouse press/movement event listener
		{
			 canvas.addEventListener('mousedown', onMouseDown, false); // Mouse button pressed
			 canvas.addEventListener('mouseup', onMouseUp, false); // Mouse button released
			 canvas.addEventListener('mousemove', onMouseMove, false); // Moving the mouse
			 canvas.addEventListener('mousewheel', onMouseWheel, false); // Mouse wheel scrolled
		}
	}
	
	function onKeyDown(event) // The function that runs when a key is pressed
	{
		var keyCode = event.keyCode; // The keycode variable
		
		switch(keyCode) // A switch statement that runs through each key press and executes it's specific code
		{
			case 68: // D
				if (dynamicSize == true) // Checks to see if dynamic size is true
				{
					dynamicSize = false; // Toggles the dynamic size option to off
				}
				else
				{
					dynamicSize = true; // Toggles the dynamic size option to on
				}
				break;
			case 107: // +
				scale += 0.05; // Increases the zoom scale variable
				drawFaultTree(); // Redraws the tree with the new scale value
				break;
			case 109: // -
				scale -= 0.05; // Decreases the zoom scale variable
				drawFaultTree(); // Redraws the tree with the new scale value
				break;
			case 36: // Home
				restrictTransformation = true; // Sets the transformation restriction bool to true as the program is now going to draw the home screen
				resetVariables(); // Calls the function that resets all the variables to default
				drawHomeScreen(); // Draws the home screen
				break;
			case 77: // M
				restrictTransformation = true; // Sets the transformation restriction bool to true as the program is now going to draw the more info screen
				resetVariables(); // Calls the function that resets all the variables to default
				drawMoreInfo(); // Draws the more info screen
				break;
			case 49: // 1
				restrictTransformation = false; // Sets the transformation restriction bool to false as the program is no longer drawing the home screen or the more info screen
				faultTreeNum = 0; // Setting the tree number to 0 (tree 1)
				resetVariables(); // Calls the function that resets all the variables to default
				drawFaultTree(); // Drawing the tree (tree 1)
				break;
			case 50: // 2
				restrictTransformation = false; // Sets the transformation restriction bool to false as the program is no longer drawing the home screen or the more info screen
				faultTreeNum = 1; // Setting the tree number to 1 (tree 2)
				resetVariables(); // Calls the function that resets all the variables to default
				drawFaultTree(); // Drawing the tree (tree 2)
				break; 
			case 51: // 3
				restrictTransformation = false; // Sets the transformation restriction bool to false as the program is no longer drawing the home screen or the more info screen
				faultTreeNum = 2; // Setting the tree number to 2 (tree 3)
				resetVariables(); // Calls the function that resets all the variables to default
				drawFaultTree(); // Drawing the tree (tree 3)
				break;
			case 70: // F
				fitToCanvas(); // Calls the function that fits the current tree to the canvas size
				break;
		}
	}
	
	function onMouseDown(event) // The function called when a mouse button is pressed
	{
		mouseDown = true; // Sets the mouseDown bool to true as the mouse button has been pressed
	}
	
	function onMouseUp(event) // The function called when a mouse button is released
	{
		mouseDown = false; // Sets the mouseDown bool to false as the mouse button has been released
	}
	
	function onMouseMove(event) // The function called when the mouse is moved
	{	
		mousePos = new Vector(event.clientX, event.clientY); // Sets the current mouse position
		
		if (mouseDown == true) // An if statement that runs it's code only if a mouse button is held down
		{
			mousePos.subtract(previousMousePos); // Gets the difference between the mouse position and the previous mouse position
			pan.add(mousePos); // Adds this difference to the current pan
			drawFaultTree(); // Redraws the tree with the new panning values
		}
		previousMousePos = new Vector(event.clientX, event.clientY); // Sets the previous mouse position to the current mouse position
	}
	
	function onMouseWheel(event) // The function called when you scroll the mouse wheel
	{
		previousScale = scale;
		mouseRoll = event.wheelDelta/3; // Setting the mouseRoll variable to the delta value of the scroll wheel
		if (mouseRoll >= 0) // An if statement that only runs it's code when the delta is positive
		{
			scale += 0.05; // Increases the scale variable of the zooming
			zoomToMouse(); // Calls the function that changes the pan value to the mouse pointer position
			drawFaultTree(); // Redraws the tree with the new scale value
		}
		else // This else only runs it's code when the delta is negative
		{
			scale -= 0.05; // Decreases the scale variable of the zooming
			zoomToMouse(); // Calls the function that changes the pan value to the mouse pointer position
			drawFaultTree(); // Redraws the tree with the new scale value
		}
		
		if (moreInfoScroll == true) // An if statement that checks to see if the user is on the more info page
		{
			if (mouseRoll >= 0) // An if statement that only runs it's code when the delta is positive
			{
				yTranslate += 200; // Increases the y translate variable
				drawMoreInfo(); // Redraws the more info page with the new translate value
			}
			else // This else only runs it's code when the delta is negative
			{
				yTranslate -= 200; // Decreases the y translate variable
				drawMoreInfo(); // Redraws the more info page with the new translate value
			}
		}
	}
	
	function zoomToMouse () // The function that changes the pan value to the mouse pointer position
	{
		pan.setX(  (  (  (  (pan.getX() - (mousePos.getX() - (canvas.width/3))) / previousScale) * scale) / 2)); // Sets the pan x value to the mouse pointer
		pan.setY(  (  (  (  (pan.getY() - (mousePos.getY() - (canvas.height/3))) / previousScale) * scale) / 2)); // Sets the pan y value to the mouse pointer
	}
	
	window.onresize = function dynamicResize() // This function is called when the window has been resized
	{
		if (dynamicSize == true) // Checks to see if dynamic resize mode is on
		{
			canvas.width = window.innerWidth + 550; // Sets the canvas width to the window width
			canvas.height = window.innerHeight + 50; // Sets the canvas height to the window height
			if (restrictTransformation == false) // If the home screen and more info screen aren't being drawn
			{
				drawFaultTree(); // Then redraw the current fault tree
			}
			else if (moreInfoScroll == true) // If the more info screen is drawn
			{
				drawMoreInfo(); // Then redraw the current fault tree
			}
			else // Otherwise
			{
				drawHomeScreen(); // Redraw the home screen
			}
		}
	}
	
	function clearScreen() // A function that clears the entire screen
	{
		context.save(); // Starts by saving all the context settings
		context.translate(-canvas.width * 0.5, -canvas.heigth * 0.02); // Moves the origin to the top left corner
		context.clearRect(0, 0, canvas.width, canvas.height); // Clears the whole canvas
		context.restore(); // Restores the context settings
	}
	
	function resetVariables() // A function that resets all the variables back to default
	{
		// All these variables are being reset to their default values
		pan = new Vector(canvas.width/20, canvas.height * 0.02);
		previousMousePos = new Vector(event.clientX, event.clientY);
		previousScale = 0.2;
		scale = 0.2;
		moreInfoScroll = false;
	}
	
	function fitToCanvas() // A function that centres and zooms out the tree to fit the canvas
	{
		if (restrictTransformation == false) // An if statement that will only run it's code if the transformation code isn't restricted
		{
			clearScreen(); // Starts by clearing the screen
			resetVariables(); // Resets the variables again (centres the tree at the top)
			scale = 0.65/exampleFaultTree.mFaultTrees[faultTreeNum].numChildren(); // Scales the tree to fit to canvas
			drawFaultTree(); // Draws the tree
		}
	}
	
	function drawFaultTree() // The function that draws the trees
	{
		if (restrictTransformation == false) // An if statement that will only run it's code if the transformation code isn't restricted
		{
			clearScreen(); // Starts by clearing the screen
			context.save(); // Saves all the context settings
			context.translate(canvas.width * 0.35, canvas.height * 0.08); // Moves the canvas origin to the top middle
			if (scale <= 0.05) // This if statement sets the scale to 0.05 (The biggest zoom out) if the scale variable goes to 0 or lower
			{
				scale = 0.05; // Sets scale to 0.05 (The biggest zoom out)
			}
			if (scale >= 2.3) // This if statement sets the scale to 2.3 (The biggest zoom in) if the scale variable goes above this value
			{
				scale = 2.3; // Sets scale to 2.3 (The biggest zoom in)
			}
			context.translate(pan.getX(), pan.getY()); // Panning translates (fetches coordinates from the panning functions (onMouseMove() and onKeyDown())
			context.scale(scale, scale); // Scales the context (only affects context if zooming)
		    //console.log(pan.getX());
			//console.log(pan.getY());
			exampleFaultTree.mFaultTrees[faultTreeNum].draw(); // Draws the current tree number (0 = 1, 1 = 2 and 2 = 3 due to array start being at 0)
			context.restore(); // Restores all the context settings
			//drawGrid(); // Calls the grid drawing function
			drawMinimap(); // Calls the function that draws the minimap
		}
	}
	
	function drawHomeScreen() // The home screen draw function
	{
		clearScreen(); // Starts by clearing the screen
		context.save(); // Saves all the context settings
		context.translate(canvas.width * 0.01, canvas.height * 0.08); // Prepares the origin in the top left
		context.font = "70pt Calibri"; // Font size and style
		context.fillStyle = "#000000"; // Font colour = black
		
		context.fillText ("Press 1, 2 or 3 to draw a fault tree", 0, 20); // The text that is drawn from left to right at the top of the screen
		
		context.font = "30pt Calibri"; // Font size and style
		
		// Home screen text
		context.fillText ("Press 'Home' to return to this main menu", 0, 150);
		context.fillText ("Press the number of the tree you are on to reset it", 0, 190);
		context.fillText ("Pan the tree by clicking and dragging", 0, 230);
		context.fillText ("Zoom by scrolling the mouse wheel", 0, 270);
		context.fillText ("You can also zoom using the '+' and '-' keys on the numpad", 0, 310);
		context.fillText ("To fit the fault tree to the canvas press 'F'", 0, 350);
		context.fillText ("Press 'D' to toggle dynamic resize mode", 0, 390);
		context.fillText ("Press 'M' for more detail", 0, 490);
		
		context.restore(); // Restores all the context settings
	}
	
	function drawMoreInfo() // The more info function
	{
		moreInfoScroll = true; // Setting the scroll variable to true
		clearScreen(); // Clears the screen
		context.save(); // Saves all the context settings
		if (yTranslate > canvas.height * 0.15) // Stopping the scroll to go further up than needed
		{
			yTranslate = canvas.height * 0.15;
		}
		if (yTranslate < -3300) // Stopping the scroll to go further down than needed
		{
			yTranslate = -3300;
		}
		context.translate(xTranslate, yTranslate); // Prepares the origin in the top left
		
		context.font = "20pt Calibri"; // Font size and style
		context.fillStyle = "#000000"; // Font colour = black
		
		// More info text
		context.fillText ("This application is a fault tree viewer. There are three fault trees preloaded into this application that can be viewed using ", 0, -50);
		context.fillText ("the '1', '2' or '3' keys.", 3, -20);
		context.fillText ("Upon pressing one of these keys, you will be presented with a screen like this depending on which tree you selected:", 0, 20);
		context.drawImage(screenshot1, 0, 60);
		
		context.fillText ("On this screen you can see several things:", 0, 420);
		context.fillText ("An And Gate:", 0, 450);
		context.drawImage(screenshot2, -35, 465);
		
		context.fillText ("An Or Gate:", 0, 850);
		context.drawImage(screenshot3, -25, 870);
		
		context.fillText ("A Basic Event:", 0, 1250);
		context.drawImage(screenshot4, 0, 1300);
		
		context.fillText ("And although you can't see it in the image there are also Transfer Gates:", 0, 1650);
		context.drawImage(screenshot5, 0, 1700);
		
		context.fillText ("You can also see this minimap here:", 0, 2050);
		context.drawImage(screenshot6, 0, 2090);
		
		context.fillText ("The minimap shows a constant miniature version of the current tree as well as your view and zoom level.", 0, 2450);
		context.fillText ("Zoom represented on the minimap:", 0, 2480);
		context.drawImage(screenshot7, 0, 2520);
		
		context.fillText ("Panning represented on the minimap:", 0, 3250);
		context.drawImage(screenshot8, 0, 3300);
		
		context.fillText ("Each tree starts with a top node such as an And Gate. This top node is, initially, the only node that is drawn.", 0, 3800);
		context.fillText ("The top node then goes through and draws each of it's children in turn.", 0, 3830);
		context.fillText ("While drawing it's children, it also sets up their positions.", 0, 3860);
		context.fillText ("When the children have finished drawing, they begin drawing their own children and it goes on until all nodes are drawn.", 0, 3890);
		context.fillText ("All of the nodes are put into their positions, relevant to their parent, and in the end you get a perfectly drawn fault tree.", 0, 3920);
		
		context.restore(); // Restores all the context settings
	}
	
	function drawMinimap() // The function that draws the minimap
	{
		context.save(); // Saves all the context settings
		context.translate(10, canvas.height * 0.7); // Starts by moving to the top left corner 
		context.scale(0.1, 0.1); // Scales it down to 10% of canvas size
		context.lineWidth = 10; // Sets line width to 10 so we can see the border lines
		context.rect(0, 0, canvas.width, canvas.height + 500); // Draws the minimap borders
		context.clip(); // Sets it so nothing can be drawn out of the minimap borders
		context.fillStyle = "#ffffff"; // Set the background to white
		context.fill(); // Draws the background
		context.stroke(); // Drawing everything
		context.translate(canvas.width/2, canvas.height * 0.3); // Moves to the top middle of the minimap box
		
		if (faultTreeNum == 2) // This if statement only runs if the third fault tree is drawn
		{
			context.translate(pan.getX(), pan.getY()); // Translates the tree in the minima depending on the panning
		}
			
		exampleFaultTree.mFaultTrees[faultTreeNum].draw(); // Draws a mini version of the current tree
		
		context.beginPath();
		context.scale(0.7/scale, 0.93/scale); // Sets the scale for the field of view box
		context.rect(-pan.getX() - 850, -pan.getY() - 155, canvas.width, canvas.height); // Creates the field of view box
		context.stroke(); // Drawing everything
		context.restore(); // Restores all the context settings
	}
	
	// Calling all the initial functions
	initialise();
	eventHandlers();
	drawHomeScreen();
}