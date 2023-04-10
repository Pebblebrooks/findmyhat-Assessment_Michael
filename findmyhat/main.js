/*
This program generates a field of a specified size with a certain percentage of holes and a randomly placed hat. 

The player starts at position 0,0 and can move up, down, left or right. The game ends if the player falls into a hole or moves out of bounds, or if the player finds the hat. 

The code will continue to prompt user for a valid move until the game ends or user breaks the program. 

For higher difficulty levels, user can increase no. of holes on the board by increasing the percentage. However, game does not contain any logic to ensure user is not blocked and has at least one clear path to the hat or such that user is not placed too close to the starting position. 
*/


// Import necessary node package modules
const prompt = require('prompt-sync')({ sigint: true });//Prompt user input
const clear = require('clear-screen');//Clear screen

// Define game constants
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

// Define function to generate the game field with 3 parameters. The percentage controls the total number of pieces on the board including hat, user and holes. No. of holes = (% of board size)-2 (minus the hat and the user) e.g. 20 means 20% of 100 characters =20. No. of holes=20-2=18.
function generateField(row, col, percentage) {
    let field = []; //define field as an Array
    // Loop through rows - create 10 new rows by iteration
    for (let i = 0; i < row; i++) {
        let newRow = [];//

        // Loop through columns-create 10 new columns by iteration 
        for (let j = 0; j < col; j++) {
            // Generate a random number between 0 and 99
            let random = Math.floor(Math.random() * 100);

            // If the random number is less than the percentage, add a hole to the field
            if (random < percentage) {
                newRow.push(hole);

            } else {
                // Otherwise, add a field character to the field
                newRow.push(fieldCharacter);
            }
        }
        // Add the row to the field
        field.push(newRow);
    }

    // Set the hat at a random location
    let hatRow = Math.floor(Math.random() * row);
    let hatCol = Math.floor(Math.random() * col);
    field[hatRow][hatCol] = hat;

    // Set the user starting point
    field[0][0] = pathCharacter;

    return field;
}
// Define function to print the game field
function printField(field) {
    for (let i = 0; i < row; i++) {
        console.log(field[i].join(''));
    }
}
// Define function to check if the user is out of bounds
function isOutOfBounds(row, col) {
    return row < 0 || col < 0 || row >= field.length || col >= field[0].length;
}
// Define function to play the game
function playGame(field) {
    // Set the initial user position
    let currentRow = 0;
    let currentCol = 0;
    let playing = true;

    while (playing) {
        clear(); //clear the screen for new game
        printField(field);

        // Get the user's move
        let move = prompt('Which way? ');

        // Update the user's position based on the move
        switch (move.toUpperCase()) {
            case 'U':
                currentRow -= 1; //move one row up
                break;
            case 'D':
                currentRow += 1; // move one row down
                break;
            case 'L':
                currentCol -= 1; //move one column left
                break;
            case 'R':
                currentCol += 1; //move one column right
                break;
            default:
                console.log('Enter (u, d, l, or r)');
                break;
        }
        // Check if the user is out of bounds or has fallen down a hole or found the hat
        if (isOutOfBounds(currentRow, currentCol)) {
            console.log('Out of bounds - Game Over!');//print user is out of bounds
            playing = false;
        } else if (field[currentRow][currentCol] === hole) {
            console.log('Sorry, you fell down a hole!'); //print user has fallen down a hole
            playing = false;
        } else if (field[currentRow][currentCol] === hat) {
            console.log('Congrats, you found your hat!');//print user has found the hat
            playing = false;
        } else {
            // Update the field with the user's new position
            field[currentRow][currentCol] = pathCharacter//show the new user postion on the board
        }
    }
}

let field = generateField(row, col, 20);//generate the field. Percentage field can be adjusted to user's preference. 
playGame(field);//call to start game

