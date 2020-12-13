// This variable keeps track of who's turn it is.
let activePlayer = 'X';
//This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//This is for placing an x or o in a square
function placeXOrO(squareNumber) {
    //this ensures a square hasn't been selected already
    //the .some() method is used to check each element of selectedSquares array to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This retrieves the html element id that was clicked.
        let select = document .getElementById(squareNumber);
        //this checks who's turn it is
        if (activePlayer === 'X') {
            //if activeplayer is equal to x the x.png is placed in html
            select.style.backgroundImage = 'url("./images/x.png")';
        //active player may only be x or o so, so if not x it must be o
        } else {
            //If activeplayer is to O the o.png is placed in html
            select.style.backgroundImage = 'url("./images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for any win conditions
        checkWinConditions() ;
        //This is for changing active player
        if (activePlayer === 'X') {
            //if active player is 'X' change it to 'O'
            activePlayer = 'o';
        //if active player is anything other than 'X' 
        } else {
            //change the active player to 'X'
            activePlayer = 'X';
        }

        //This function plays placement sound.
        audio('./media/place.mp3');
        //This condition checks to see if it is computers turn.
        if(activePlayer === 'o') {
            //This function disables clicking for computer choice.
            disableClick();
            //this function waits 1 second before placing the image and enabling click.
            setTimeout(function (){ computersTurn(); }, 1000);
        }
        //Returning true is needed for our computersTurn() function to work.
        return true;
    }

    //This function results in a random square being selected.
    function computersTurn() {
        //This boolean is needed for our while loop.
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //This allows our while loop to keep trying if a square is selected already.
        while(!success) {
            //A random number between 0-8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evaluates returns true, the square hasn't been selected yet.
            if (placeXOrO(pickASquare)) {
                //this line calls the functions
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

//This function parses the selected Squares array to search for win conditions. drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    //X/O 0-8 condition.
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLin(50, 304, 558, 304); }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLin(50, 508, 558, 508); }
    else if (arrayIncludes('OX', '3X', '6X')) { drawWinLin(100, 50, 100, 558); }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLin(304, 50, 304, 558); }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLin(508, 50, 508, 558); }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLin(100, 508, 510, 90); }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLin(100, 100, 520, 520); }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLin(50, 100, 558, 100); }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLin(50, 304, 558, 304); }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLin(50, 508, 558, 508); }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLin(100, 50, 100, 558); }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLin(304, 50, 304, 558); }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLin(508, 50, 508, 558); }
    else if (arrayIncludes('60', '4O', '2O')) { drawWinLin(100, 508, 510, 90); }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLin(100, 100, 520, 520); }
    //This condition checks for a tie. If none of the above conditions register and 9 squares are selected, the code executes.
    else if (selectedSquares.length >= 9) {
    //This plays the tie sound.
    audio('./media/tie.mp3');
    //This function sets a .3 second timer before resetGame is called.
    setTimeout(function () { resetGame(); }, 500);
}

//This function checks if an array inclused 3 strings. It is used to check win condition.
function arrayIncludes(squareA, squareB, squareC) {
    //Next 3 variables will be used to check for 3 in a row.
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    // if the 3 variables we pass are all included in our array true is returned and our else if condition executes the drawWinLine function.
    if (a === true && b === true && c === true) { return true; }
    }
}

function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
}

//This function takes a string parameter of the path set earlier for placement sound.
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

//This utilizes html canvas to draw lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

//This function interacts with the canvas.
function animateLineDrawing() {
    //This creates the loop for when the ends
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    //sets line color.
    c.strokeStyle = 'rgba(70, 255, 33, .8)';
    //this draws everything laid out above.
    c.stroke();
    //this checks if we've reached the end point.
    if (x1 <= x2 && y1 <= y2) {
        if (x < x2) { x += 10; }
        if (y < y2) { y += 10; }
        //this cancels our animation loop if end point reached.
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    //This condition is similar to the one above. It was necessary for the 6, 4, 2 win condition.
    if (x1 <= x2 && y1 >= y2) {
        if (x <x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
}

//This clears the canvas after win line is drawn.
function clear() {
    //start animation loop.
    const animationLoop = requestAnimationFrame(clear);
    //clears canvas.
    c.clearRect(0, 0, 608, 608);
    //stops animation loop.
    cancelAnimationFrame(animationLoop);
}

//this line disallows clicking while the win sound is playing
disableClick();
//win sound
audio('./media/winGame.mp3');
animateLineDrawing();
//This waits 1 second, then clears canvas, resets game, and allows clicking again.
setTimeout(function () { clear(); resetGame(); }, 1000);

    function disableClick() {
        body.style.pointerEvents = 'none';
        setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
    }