function createGameBoard(){
    const board=[['','',''],
                ['','',''],
                ['','','']];

    let turnCounter=0;          // for turn traacking
    let currentPlayer='X'       // initial player will be X
    let playerSelection='';     
    let computerSelection='';

    // helper function to check if all cells are filled to declare draw
    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false; // Found an empty cell
                }
            }
        }
        return true; // No empty cells found
    }

    //example comments are for personal notes

    // helper function to check if all cells of a row or a column are same
    function isSame(a, b, c){         
        return a !== '' && a === b && a === c;  // returns true only if first cell of row or col are not empty and all 3 cells of row or col are full
    }                                           // eg:  if (this.board[0][j] === 'X' || this.board[0][j] === 'O') {  // column check converted to this
                                                 // if (this.board[0][j] === this.board[1][j] && this.board[0][j] === this.board[2][j]) 

    return {board,
    turnCounter,
    currentPlayer,
    playerSelection,
    computerSelection,

    markCell(row, col, player) {
        if(this.board[row][col]===''){
            this.board[row][col]=player;
            this.currentPlayer=player === 'X' ? 'O' : 'X';      // if player is X then switch player to O  
            this.turnCounter++;
            return true;
        }
        return false;
    },

    reset(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                this.board[i][j]='';
            }

        }
        this.turnCounter = 0; // Reset turn counter
        this.currentPlayer = 'X'; // Reset to initial player

    },
    checkWinner() {
        // Row Check: Loop through each row
        for (let i = 0; i < 3; i++) {
            // Check if the first cell in the row is either 'X' or 'O'
            if (isSame(this.board[i][0], this.board[i][1], this.board[i][2])) {
                    console.log(`Winner found in row ${i}`);
                    return this.board[i][0]; // Return the winner ('X' or 'O')
                }
        }
    
        // Column Check: Loop through each column
        for (let j = 0; j < 3; j++) {
            if (isSame(this.board[0][j], this.board[1][j], this.board[2][j])) {
                    console.log(`Winner found in column ${j}`);
                    return this.board[0][j]; // Return the winner ('X' or 'O')
                }
        }
    
        // Diagonal Check 1: Top-left to bottom-right
        if (isSame(this.board[0][0], this.board[1][1], this.board[2][2])) {
                console.log('Winner found in diagonal 1');
                return this.board[0][0]; // Return the winner ('X' or 'O')
            }
    
        // Diagonal Check 2: Top-right to bottom-left
        if (isSame(this.board[0][2], this.board[1][1], this.board[2][0])){
                console.log('Winner found in diagonal 2');
                return this.board[0][2]; // Return the winner ('X' or 'O')
        }
    
         // Check for a draw (if no winner is found and all cells are filled)
        if(isBoardFull()){
            console.log('no winner found, game draw');
            return 'draw'; // Indicate draw
        }

    // If no winner and not a draw, return null (game is still ongoing)
        return null;
    },

    // Simple random move for computer -- easy mode for now

    computerMove(){
            const emptyCellCount=[];                            //empty array to count all the empty cell at time of func initilization
            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    if(this.board[i][j]===''){                    //if empty cell found
                        emptyCellCount.push({row: i, col: j});      // store all the empty cells row and col value in our array
                    }
                }
            }
            if(emptyCellCount.length>0){
                const move=emptyCellCount[Math.floor(Math.random()*emptyCellCount.length)];     // make a random move based on the index of i.e emptyCellCount[1]
                this.markCell(move.row, move.col, this.currentPlayer);              //  eg data in move is {row:1, col:2};
            }
    },

    symbolAllocation(){
        // this.playerSelection=prompt("Enter your symbol 'X' or 'O'");                  // store player selection
        this.computerSelection=this.playerSelection==='X' ? 'O' : 'X';        // store the opposite of player selection
        console.log(`Player selection is ${this.playerSelection}`);
        console.log(`Computer Selection is ${this.computerSelection}`);
    },

isValidMove(row, col) {
    // Check if the cell is within bounds and not already marked
    return row >= 0 && row < 3 && col >= 0 && col < 3 && this.board[row][col] === '';
},

getPlayerMove() {
    let row, col;
    // row = prompt("Enter the row (0, 1, or 2):");
    // col = prompt("Enter the column (0, 1, or 2):");

    // Convert inputs to numbers
    row = parseInt(row);
    col = parseInt(col);

    console.log(`Player input - Row: ${row}, Column: ${col}`);

    // Validate input
    if (this.isValidMove(row, col)) {
        this.markCell(row, col, this.currentPlayer);
        return true; // Move was successful
    } else {
        console.log("Invalid move, please try again.");

        // Check for a draw condition
        if (this.turnCounter >=9) { // 9 moves already made 
            console.log('Game ends in a draw due to round limit');
            return false; // Return false to indicate the game should end
        }
        
        return false; // Move was unsuccessful
    }
},

isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === '') {
                return false; // Found an empty cell, so the board is not full
            }
        }
    }
    return true; // If no empty cells were found, the board is full
},
playGame() {
    this.symbolAllocation();

    if (this.playerSelection === 'O') {
        this.currentPlayer = this.computerSelection;
        this.computerMove();
    } else {
        this.currentPlayer = this.playerSelection;
    }

    while (true) {
        // Player's turn
        const playerMoveSuccess = this.getPlayerMove(); // Player makes a move
        if (playerMoveSuccess) { // Check if the player's move was successful
            const winnerAfterPlayerMove = this.checkWinner();
            if (winnerAfterPlayerMove) {
                console.log(`Winner is ${winnerAfterPlayerMove}`);
                return; // Ends the game if there's a winner
            }

            // Only if the player's move is valid should we proceed to the computer's turn
            this.currentPlayer = this.computerSelection; // Switch to computer's turn
            this.computerMove(); // Computer makes a move
            
            const winnerAfterCompMove = this.checkWinner();
            if (winnerAfterCompMove) {
                console.log(`Winner is ${winnerAfterCompMove}`);
                return; // Ends the game if there's a winner
            }
        } else {
            console.log("Invalid move, skipping computer's turn.");
            // Optionally, you can also provide feedback to the player here
        }

        // Check for a draw condition after both turns
        if (this.turnCounter >= 9) {
            console.log('Game ends in a draw');
            return;
        }

        // Reset current player to player's selection for the next iteration
        this.currentPlayer = this.playerSelection;
    }
},


    
    
}
}

// const gameBoard=createGameBoard();
// console.log(gameBoard);

// // console.log(gameBoard.playGame());

// // console.log(gameBoard.board);

// // console.log(gameBoard.checkWinner());

// // console.log(gameBoard.turnCounter);

function showModal() {
    document.getElementById('selectionModal').style.display = 'block';
}

// Close the modal and set player selection
function closeModal(playerSymbol) {
    document.getElementById('selectionModal').style.display = 'none';
    gameBoard.symbolAllocation(playerSymbol); // Pass the selected symbol to your game logic
}

// Event listeners for the buttons
document.getElementById('selectX').addEventListener('click', () => closeModal('X'));
document.getElementById('selectO').addEventListener('click', () => closeModal('O'));
document.getElementById('cancel').addEventListener('click', () => closeModal(null));

// Call showModal when the game starts
showModal();