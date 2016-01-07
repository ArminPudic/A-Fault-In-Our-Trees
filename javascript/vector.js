var Vector = (function () //The vector function that creates vectors and gets their x and y values
			{
				function Vector(pX, pY) // This function sets the input values as the x and y values of the new vector
				{
					this.setX(pX); // Calls the function that sets the x input to the x value of the new vector
					this.setY(pY); // Calls the function that sets the y input to the y value of the new vector
				};
				Vector.prototype.getX = function() // A function that gets the x value of current vector and returns it
				{
					return this.mX; // Returning the vector's x value
				};
				Vector.prototype.setX = function (pX) // The function that sets the x input to x coordinate of the vector
				{
					this.mX = pX; // Sets x input to x coordinate
				};
				Vector.prototype.getY = function() // A function that gets the y value of current vector and returns it
				{
					return this.mY; // Returning the vector's y value
				};
				Vector.prototype.setY = function (pY) // The function that sets the y input to y coordinate of the vector
				{
					this.mY = pY; // Sets y input to y coordinate
				};
				Vector.prototype.add = function (vector) // A function that adds two vectors together
				{
					this.setX(this.getX() + vector.getX()); // Adding the two x values
					this.setY(this.getY() + vector.getY()); // Adding the two y values
				};
				Vector.prototype.subtract = function (vector) // A function that minuses a vector from another vector
				{
					this.setX(this.getX() - vector.getX()) // x value of a vector minus another
					this.setY(this.getY() - vector.getY()); // y value of a vector minus another
				};
				return Vector; // Returning the new vector
			}
			) ();