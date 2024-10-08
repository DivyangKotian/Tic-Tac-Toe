function createGameBoard(){
    const board=[['','',''],
                ['','',''],
                ['','','']];
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

    markCell(row, col, player) {
        if(this.board[row][col]===''){
            this.board[row][col]=player;
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
    
    }
}

const gameBoard=createGameBoard();
console.log(gameBoard);

console.log(gameBoard.markCell(0,0,'O'));
console.log(gameBoard.markCell(0,1,'X'));
console.log(gameBoard.markCell(0,2,'O'));
console.log(gameBoard.markCell(1,0,'O'));
console.log(gameBoard.markCell(1,1,'X'));
console.log(gameBoard.markCell(1,2,'O'));
console.log(gameBoard.markCell(2,0,'X'));
console.log(gameBoard.markCell(2,1,'O'));
console.log(gameBoard.markCell(2,2,'X'));



console.log(gameBoard.board);

console.log(gameBoard.checkWinner())

