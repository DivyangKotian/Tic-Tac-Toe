// Function to create the game board and manage the game state
function createGameBoard() {
    const board = [['', '', ''], 
                    ['', '', ''], 
                    ['', '', '']];

    let turnCounter = 0;          
    let currentPlayer = 'X';       
    let playerSelection = '';     
    let computerSelection = '';
    let gameOver = false;                   
    let difficultyLevel=1 ; // Default to easy

    // Minimax algorithm to determine the best move
    
    // Helper function to toggle gameover flag
    
    // Helper function to check if the board is full
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

    // Helper function to check if all cells of a row or column are the same
    function isSame(a, b, c) {
        return a !== '' && a === b && a === c;
    }

    function checkWinner() {
        // Row Check
        for (let i = 0; i < 3; i++) {
            if (isSame(board[i][0], board[i][1], board[i][2])) {
                return board[i][0]; // Return the winner (X or O)
            }
        }
    
        // Column Check
        for (let j = 0; j < 3; j++) {
            if (isSame(board[0][j], board[1][j], board[2][j])) {
                return board[0][j]; // Return the winner (X or O)
            }
        }
    
        // Diagonal Check 1
        if (isSame(board[0][0], board[1][1], board[2][2])) {
            return board[0][0]; // Return the winner (X or O
        }
    
        // Diagonal Check 2
        if (isSame(board[0][2], board[1][1], board[2][0])) {
            return board[0][2]; // Return the winner (X or O)
        }
    
        // Check for a draw
        if (isBoardFull()) {
            return 'draw'; // Return 'draw' if the board is full
        }
    
        return null; // No winner, game continues
    }
    

    return {
        board,
        turnCounter,
        currentPlayer,
        playerSelection,
        computerSelection,
        gameOver,
        difficultyLevel,

        minimax(board, player) {
        let opponent = player === 'X' ? 'O' : 'X';
        let winner = this.checkWinner(); // Check current state of the board
    
        if (winner === this.computerSelection) return { score: 10 }; 
        if (winner === this.playerSelection) return { score: -10 }; 
        if (winner === 'draw') return { score: 0 }; 
    
        const moves = [];
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === '') {
                    this.board[i][j] = player; 
                    const score = this.minimax(this.board, opponent).score;  
                    console.log("Board state:", board);
console.log("Moves array before push:", moves);
                    moves.push({ score, row: i, col: j });
                    this.board[i][j] = ''; // Undo the move
                }
            }
        }
    
        let bestMove = null; // Initialize bestMove
        if (player === this.computerSelection) {
            let maxScore = -Infinity;
            for (const move of moves) {
                if (move.score > maxScore) {
                    maxScore = move.score;
                    bestMove = move;
                }
            }
        } else {
            let minScore = Infinity;
            for (const move of moves) {
                if (move.score < minScore) {
                    minScore = move.score;
                    bestMove = move;
                }
            }
        }
        // console.log(bestMove);
        // If no best move found, return a default value
        return bestMove || { score: currentPlayer === computerSelection ? -Infinity : Infinity, row: -1, col: -1 };

    },
        
        // Function to mark a cell
        markCell(row, col, player) {
            if (this.board[row][col] === '') {
                this.board[row][col] = player;
                this.turnCounter++;
                this.setGameOver();
                return true;
            }
            return false;
        },

        setGameOver() {
            const winner = this.checkWinner();
            if (winner&& winner!=='draw') {
                this.gameOver = true;
                console.log(`Game Over: Winner is ${winner}`);
            } else if (winner === 'draw') {
                this.gameOver = true;
                console.log("Game Over: It's a draw.");
            }
        },
        

        // Function to reset the game state
        reset() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board[i][j] = '';
                }
            }
            this.turnCounter = 0;
            this.currentPlayer = 'X';
            this.gameOver = false;
            this.difficultyLevel=1;
        },

        // Computer move function based on difficulty
       // Computer move function based on difficulty
        computerMove() { 
            if (!this.gameOver) {
                const emptyCells = [];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (this.board[i][j] === '') {
                            emptyCells.push({ row: i, col: j });
                        }
                    }
                }

                if (emptyCells.length === 0) return null; // No valid moves left

                // If it's the first turn for the computer, choose a random move
                if (this.turnCounter <= 1) {
                    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    this.markCell(randomMove.row, randomMove.col, this.computerSelection);
                    return randomMove;
                }

                if (this.difficultyLevel === 3) {
                     // Hard: Use Minimax algorithm
                        const bestMove = this.minimax(this.board, this.computerSelection);
                        if (bestMove && bestMove.row !== -1 && bestMove.col !== -1) {
                            this.markCell(bestMove.row, bestMove.col, this.computerSelection);
                            return bestMove;
                        } else {
                            console.log("No valid move found"); // Handle fallback, such as game already being over
                            return null; // or any other fallback behavior you need
                        }
                    }
                 else if (this.difficultyLevel === 1) {
                    // Easy: Random move
                    const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    this.markCell(move.row, move.col, this.computerSelection);
                    return move;
                } 
                else if (this.difficultyLevel === 2) {
                    // Medium: Try to block player
                    for (const cell of emptyCells) {
                        // Temporarily make the move for the player and check if the player would win
                        this.board[cell.row][cell.col] = this.playerSelection; // Simulate player's move
                        const potentialWinner = this.checkWinner(); // Check if this move would let the player win
                        
                        if (potentialWinner === this.playerSelection) {
                            this.board[cell.row][cell.col] = ''; // Undo move
                            this.markCell(cell.row, cell.col, this.computerSelection); // Block the player by marking this cell
                            console.log(`Computer blocks at row: ${cell.row}, col: ${cell.col}`);
                            return cell; // Return the blocking move
                        }

                        // Undo move if no block is needed
                        this.board[cell.row][cell.col] = '';
                    }

                    // If no block is needed, make a random move (as fallback)
                    const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    this.markCell(move.row, move.col, this.computerSelection);
                    console.log(`Computer makes a random move at row: ${move.row}, col: ${move.col}`);
                    return move;
                }

                console.log('Board state after player move:', this.board);
            }
            console.log(`gameOver flag is set to: ${gameBoard.gameOver}`);

        },

        // Function to allocate symbols to respective players
        symbolAllocation(symbol){
            this.playerSelection = symbol;
            this.computerSelection = this.playerSelection === 'X' ? 'O' : 'X'; // Store the opposite of player selection
            console.log(`Player selection is ${this.playerSelection}`);
            console.log(`Computer selection is ${this.computerSelection}`);
        },

        // Helper function to validate a move
        isValidMove(row, col) {
            return row >= 0 && row < 3 && col >= 0 && col < 3 && this.board[row][col] === '';
        },

     // Function to take player input
    getPlayerMove(row, col) {
        if (this.isValidMove(row, col)) {
            this.markCell(row, col, this.currentPlayer);
            this.setGameOver(); // Check for a winner after player's move
            if (this.gameOver) {
                console.log(`Game Over: Winner is ${checkWinner()}`);
                return true; // Move was successful
            }
            return true; // Move was successful
        } else {
            console.log("Invalid move, please try again.");
            return false; // Move was unsuccessful
        }
    },

        // Function to switch players
        switchPlayer() {
            this.currentPlayer = this.currentPlayer === this.playerSelection ? this.computerSelection : this.playerSelection;
            console.log('Switched to:', this.currentPlayer);
        },

        // Expose the checkWinner function for use in minimax
        checkWinner: checkWinner
    };
}
const gameBoard = createGameBoard();
console.log(gameBoard.board);


// Function to reset the game for a new game
function newGame() {
    gameBoard.reset(); // Reset the game board state
    cellData.forEach(cellElement => {
    cellElement.textContent = ''; // Clear the text content of each cell
    });
    gameBoard.difficultyLevel=1;
    displayMessage.textContent= "";
    showModal(); // Show the modal again for player selection
}

// Event listeners for the start game modal buttons
document.getElementById('selectX').addEventListener('click', () => closeModal('X')); // Store X and close modal
document.getElementById('selectO').addEventListener('click', () => closeModal('O'));
document.getElementById('cancel').addEventListener('click', () => closeModal(null));

// Reset game board on new game button
document.getElementById('newGameButton').addEventListener('click', () => {
    // Reset the game board logic here
    gameBoard.reset();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    
    const difficultySlider = document.getElementById('difficulty-slider');
    gameBoard.difficultyLevel = 1; // Reset difficulty level in game logic
    difficultySlider.value = 1; // Reset slider visual content
    
    document.getElementById('modalMessage').textContent = '';
    showModal(); 
});



// list of all cells
const cellData=document.querySelectorAll('.cell');
const displayMessage = document.getElementById('message'); // Assuming there's an element with id="message"




// event listener on all cells to make player move

cellData.forEach(cellElement => {
    cellElement.addEventListener('click', () => {
        if (!gameBoard.gameOver && gameBoard.currentPlayer === gameBoard.playerSelection) {
            const rowData = parseInt(cellElement.getAttribute('data-row'));
            const colData = parseInt(cellElement.getAttribute('data-col'));
            const moveSuccess = gameBoard.getPlayerMove(rowData, colData);
            
            if (moveSuccess) {
                cellElement.textContent = gameBoard.playerSelection; // Update display
                if(gameBoard.playerSelection==='X'){            // adding class for styling
                    cellElement.classList.add('X-color')
                    cellElement.classList.remove('O-color')
                }
                else{
                    cellElement.classList.add('O-color')
                    cellElement.classList.remove('X-color')
                }
                // Check if the game is over
                if (gameBoard.gameOver) {
                    gameEnd();
                    return; // End if there's a winner or a draw
                }
                
                gameBoard.switchPlayer(); // Switch to computer's turn
                makeCompMove(); // Make the computer move
            } else {
                console.log("Invalid move.");
            }
        }
    });
});

// Make computer move
function makeCompMove() {
    if (!gameBoard.gameOver && gameBoard.currentPlayer === gameBoard.computerSelection) {
        const compMove = gameBoard.computerMove();
        
        if (compMove) {
            const compCell = document.querySelector(`[data-row="${compMove.row}"][data-col="${compMove.col}"]`);
            compCell.textContent = gameBoard.computerSelection;

            if(gameBoard.computerSelection==='X'){      // adding class for styling
                compCell.classList.add('X-color')
                compCell.classList.remove('O-color')
            }
            else{
                compCell.classList.add('O-color')
                compCell.classList.remove('X-color')
            }
            // Check if the game is over after computer's move
            if (gameBoard.gameOver) {
                gameEnd();
                return; // End if there's a winner or a draw
            }
            
            gameBoard.switchPlayer(); // Switch to the player's turn
        }
    }
}
// function to bring up the endgame modal and declare winner
function gameEnd() {
    const modal = document.getElementById('gameEndModal');
    modal.classList.remove('hidden');
    modal.classList.add('show');
    const modalMessage = document.getElementById('modalMessage');
    const winner = gameBoard.checkWinner();
    
    if (winner === 'draw') {
        modalMessage.textContent = "It's a draw! Try again.";
    } else {
        modalMessage.textContent = `WINNER FOUND!! ${winner} wins!`;
    } // Show the modal
}

// Event listener for GAMEEND modal
document.getElementById('newGameBtn').addEventListener('click', () => {
    const modal = document.getElementById('gameEndModal');
    modal.classList.add('hidden');
    modal.classList.remove('show');
    // Reset the game board logic here
    gameBoard.reset();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    
    const difficultySlider = document.getElementById('difficulty-slider');
    gameBoard.difficultyLevel = 1; // Reset difficulty level in game logic
    difficultySlider.value = 1; // Reset slider visual content
    
    document.getElementById('modalMessage').textContent = '';
    showModal(); 
});

// Show modal for player selection
function showModal() {
    document.getElementById('selectionModal').classList.add('show');
    document.getElementById('selectionModal').classList.remove('hidden');
}

// Close the modal and set player selection
function closeModal(playerSymbol) {
    document.getElementById('selectionModal').classList.add('hidden');
    document.getElementById('selectionModal').classList.remove('show');
    gameBoard.symbolAllocation(playerSymbol); // Pass the selected symbol to your game logic
    document.querySelectorAll('.cell').forEach(cell => cell.setAttribute('class', 'cell') );// resetting class for cell border styling
    // Check if player selected 'O', if so, let the computer make the first move
    if (gameBoard.playerSelection === 'O') {
        makeCompMove(); // Start with computer's move
    }
}

// Update difficulty level based on slider input
document.getElementById('difficulty-slider').addEventListener('input', function () {
    gameBoard.difficultyLevel = parseInt(this.value);
    console.log(`Difficulty Level: ${gameBoard.difficultyLevel}`); // Log the current difficulty level
});
showModal();