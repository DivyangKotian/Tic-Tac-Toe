function createGameBoard(){
    const board=[['','',''],
                ['','',''],
                ['','','']];

    let turnCounter=0;          // for turn traacking
    const currentPlayer='X'       // initial player will be X
    const playerSelection='';     
    const computerSelection='';
    let lastCompMove;
    let gameOver = false;                   //whenever this is true we wont allow any more inputs

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
    gameOver,

    // function to check if a cell is empty and then put the desired marker on that cell
    markCell(row, col, player) {
        if(this.board[row][col]===''){
            this.board[row][col]=player;
            this.turnCounter++;
            return true;
        }
        return false;
    },

    //function to reset the game state and all necessary variables
    reset(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                this.board[i][j]='';
            }

        }
        this.turnCounter = 0; // Reset turn counter
        this.currentPlayer = 'X'; // Reset to initial player
        this.gameOver=false;

    },

    //function to check for winning or drawing conditions
    checkWinner() {
        // Row Check: Loop through each row
        for (let i = 0; i < 3; i++) {
            // Check if the first cell in the row is either 'X' or 'O'
            if (isSame(this.board[i][0], this.board[i][1], this.board[i][2])) {
                    console.log(`Winner found in row ${i}`);
                    this.gameOver=true;
                    return this.board[i][0]; // Return the winner ('X' or 'O')
                }
        }
    
        // Column Check: Loop through each column
        for (let j = 0; j < 3; j++) {
            if (isSame(this.board[0][j], this.board[1][j], this.board[2][j])) {
                    console.log(`Winner found in column ${j}`);
                    this.gameOver=true;
                    return this.board[0][j]; // Return the winner ('X' or 'O')
                }
        }
    
        // Diagonal Check 1: Top-left to bottom-right
        if (isSame(this.board[0][0], this.board[1][1], this.board[2][2])) {
                console.log('Winner found in diagonal 1');
                this.gameOver=true;
                return this.board[0][0]; // Return the winner ('X' or 'O')
            }
    
        // Diagonal Check 2: Top-right to bottom-left
        if (isSame(this.board[0][2], this.board[1][1], this.board[2][0])){
                console.log('Winner found in diagonal 2');
                this.gameOver=true;
                return this.board[0][2]; // Return the winner ('X' or 'O')
        }
    
         // Check for a draw (if no winner is found and all cells are filled)

        if(isBoardFull()){
            console.log('no winner found, game draw');
            this.gameOver = true; // Set game over if it's a draw
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
                return move;  // Return the move (row and col) to track it
            }
            return null;         // if no valid move left
    },
    // function to allocate marker to respective player
    symbolAllocation(symbol){
        this.playerSelection=symbol;
        this.computerSelection=this.playerSelection==='X' ? 'O' : 'X';        // store the opposite of player selection
        console.log(`Player selection is ${this.playerSelection}`);
        console.log(`Computer Selection is ${this.computerSelection}`);
    },
    //helper function to make sure we are entering a valid move
isValidMove(row, col) {
    // Check if the cell is within bounds and not already marked
    return row >= 0 && row < 3 && col >= 0 && col < 3 && this.board[row][col] === '';
},
    // functon to take player input and make a move
getPlayerMove(row, col) {
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

    // function to manually switch players after each turn
switchPlayer(){
    return this.currentPlayer=this.currentPlayer===this.playerSelection ? this.computerSelection: this.playerSelection;
}
}
}

 const gameBoard=createGameBoard();
 console.log(gameBoard.board);

 // show modal 
function showModal() {
    document.getElementById('selectionModal').style.display = 'block';
}

// Close the modal and set player selection
function closeModal(playerSymbol) {
    document.getElementById('selectionModal').style.display = 'none';
    gameBoard.symbolAllocation(playerSymbol); // Pass the selected symbol to your game logic

    // Check if player selected 'O', if so, let the computer make the first move
    if (gameBoard.playerSelection === 'O') {
        makeCompMove(); // Start with computer's move
    }
}

    // function to reset the game / new game
function newGame() {
    gameBoard.reset(); // Reset the game board state
    cellData.forEach(cellElement => { // Correct the variable name
        cellElement.textContent = ''; // Clear the text content of each cell
        showModal();
    });
}

// Event listeners for the modal buttons
document.getElementById('selectX').addEventListener('click', () => closeModal('X'));       // store x and close modal
document.getElementById('selectO').addEventListener('click', () => closeModal('O'));
document.getElementById('cancel').addEventListener('click', () => closeModal(null));
// Reset game board on restart button
document.getElementById('new-game-btn').addEventListener('click', () => newGame()); 

// function for computer to make a random move

function makeCompMove() {
    // Only make the computer move if the game is not over i.e gameover=false;
    if (!gameBoard.gameOver && gameBoard.currentPlayer === gameBoard.computerSelection) {
        const compMove = gameBoard.computerMove();
        if (compMove) {
            const compCell = document.querySelector(`[data-row="${compMove.row}"][data-col="${compMove.col}"]`);
            compCell.textContent = gameBoard.computerSelection;
            const winnerAfterCompMove = gameBoard.checkWinner();
            if (winnerAfterCompMove) {
                console.log(`Winner is ${winnerAfterCompMove}`);
                return; // Ends game if there's a winner
            }
            gameBoard.switchPlayer();
        }
    }
}


// list of all cells
const cellData=document.querySelectorAll('.cell');

// event listener on all cells to make player move

cellData.forEach(cellElement => {
    cellElement.addEventListener('click', () => {
        // Only allow player to move if it's their turn and the game isn't over i.e gameover=false;
        if (!gameBoard.gameOver && gameBoard.currentPlayer === gameBoard.playerSelection) {
            const rowData = parseInt(cellElement.getAttribute('data-row'));
            const colData = parseInt(cellElement.getAttribute('data-col'));
            const moveSuccess = gameBoard.getPlayerMove(rowData, colData);
            if (moveSuccess) {
                cellElement.textContent = gameBoard.playerSelection; // Update display
                const winnerAfterPlayerMove = gameBoard.checkWinner();
                if (winnerAfterPlayerMove) {
                    console.log(`Winner is ${winnerAfterPlayerMove}`);
                    return; // Ends game if there's a winner
                }
                gameBoard.switchPlayer(); // Manually switch player after player's move
                // Now it's the computer's turn
                makeCompMove();
            } else {
                console.log("Invalid move.");
            }
        }
    });
});





// Call showModal when the game starts
showModal();