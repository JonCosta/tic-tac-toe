$(function() {

    var Game = {
        
        finished: false,
        iconO: '<i class="fa fa-circle-o"></i>',
        iconX: '<i class="fa fa-times"></i>',
        playerChoice: '',
        botChoice: '',
        playerMarkedCells: [],
        botMarkedCells: [],
        winningRows: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [1, 5, 9]
        ],
        remainingRows: [],
    
        resetGame: function() {
            console.log("Game reset.");
            this.botChoice = this.playerChoice = '';
            this.playerMarkedCells = this.botMarkedCells = [];
            this.finished = false;
            this.remainingRows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        },
    
        checkIfGameOver: function(choiceArray) {
            console.log("Checking if game is over.");
            if (choiceArray.length < 3) return false;
            for (let i = 0; i < Game.winningRows.length; i++) {
                let row = Game.winningRows[i];
                for (let j = 0; j < row.length; j++) {
                    if (choiceArray.indexOf(row[j]) < 0) {
                        console.log("Not found");
                        break;
                    }
                    Game.finished = true;
                    console.log("Victory!");
                    // Victory!
                }
            }
            // If no winners, check for draw
            if (Game.playerMarkedCells.length + Game.botMarkedCells.length == 9) {
                    
            }
        },
    
        botPlay: function() {
            let cell = this.remainingRows[Math.floor(Math.random() * this.remainingRows.length)];
            $('[data-cell="'+cell+'"]').html(this.botChoice);
            this.botMarkedCells.push(cell);
            let index = this.remainingRows.indexOf(cell);
            this.remainingRows.splice(index, 1);
            this.checkIfGameOver(this.botMarkedCells);
        }
    
    };

    Game.resetGame();

    $('.b-choice').fadeIn();

    $('.choice--btn').click(function(e) {
        e.preventDefault();
        let side = $(this).data("choice");
        console.log(`You chose ${side}!`);
        Game.playerChoice = side == 'X' ? Game.iconX : Game.iconO;
        Game.botChoice = side == 'X' ? Game.iconO : Game.iconX;
        $('.b-choice').fadeOut();
        $('.b-game').fadeIn();
    });

    $('.game--table td').click(function(e) {
        // Prevents going further if the game is already finished
        if (Game.finished) return false;
        // Obtains the marked cell's number and adds it to the player's array
        let cell = $(this).data('cell');
        Game.playerMarkedCells.push(cell);
        // Remove the marked cell from the array of remaining ones
        let ind = Game.remainingRows.indexOf(cell);
        Game.remainingRows.splice(ind, 1);
        // Mark the cell with the player's icon
        $(this).html(Game.playerChoice);
        // Checks if game's over
        Game.checkIfGameOver(Game.playerMarkedCells);
        // Bot make a move
        if (!Game.finished) Game.botPlay();
    });

});