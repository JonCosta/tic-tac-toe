$(function() {

    var x = String.fromCharCode(123);

    var Game = {
        
        finished: false,
        iconO: '<i class="fa fa-circle-o"></i>',
        iconX: '<i class="fa fa-times"></i>',
        playerChoice: '',
        botChoice: '',
        playerMarkedCells: [],
        botMarkedCells: [],
        // All the possible rows of marked cells that can win a game
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
        turn: '',
    
        /**
         * Resets the Game object's main variables to the initial state
         */
        resetGame: function() {
            console.log("Game reset.");
            Game.botChoice = '';
            Game.playerChoice = '';
            Game.playerMarkedCells = [];
            Game.botMarkedCells = [];
            Game.finished = false;
            Game.remainingRows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            Game.turn = 'PLAYER';
        },
    
        /**
         * Receives an array of marked cell numbers and verifies if it contains a winning row
         * Can be used either for player and bot moves
         */
        checkIfGameOver: function(choiceArray) {
            console.log("Checking if game is over.");
            // Runs through all the winning rows, with possible cell numbers for a victory
            for (let i = 0; i < Game.winningRows.length; i++) {
                let row = Game.winningRows[i];
                for (let j = 0; j < row.length; j++) {
                    Game.finished = true;
                    // Checks if all elements of the winning row are in the marked cells array
                    if (choiceArray.indexOf(row[j]) < 0) {
                        Game.finished = false;
                        break;
                    }
                }
                // If the finished check wasn't changed during the loop, it means the chosen array has a winning row
                if (Game.finished) {
                    if (Game.turn === 'PLAYER') {
                        $('.titles--sub').html("Victory! Congratulations, you're awesome!");
                    } else {
                        $('.titles--sub').html("The bot won! Now you owe him a cookie.");
                    }
                    return false;
                }
            }
            
            // If no winners, check for draw
            if (Game.playerMarkedCells.length + Game.botMarkedCells.length == 9 && !Game.finished) {
                $('.titles--sub').html("It's a draw! What an amazing match!");
                Game.finished = true;
                return false;
            }

            console.log("Meh");
            // If the game isn't over, change turn and message
            if (Game.turn === 'PLAYER') {
                $('.titles--sub').html("It's the bot's turn... Let him focus.");
                Game.turn = 'BOT';
            } else {
                $('.titles--sub').html("It's your turn. Go wild!");
                Game.turn = 'PLAYER';
            }
        },
    
        /**
         * Function to simulate the bot player move
         */
        botPlay: function() {
            setTimeout(function() {
                // Chooses a random position of the game cells that haven't been chosen yet
                let cell = Game.remainingRows[Math.floor(Math.random() * Game.remainingRows.length)];
                $('[data-cell="'+cell+'"]').html(Game.botChoice);
                Game.botMarkedCells.push(cell);
                // Removes the chosen cell from the array of remaining
                let index = Game.remainingRows.indexOf(cell);
                Game.remainingRows.splice(index, 1);
                Game.checkIfGameOver(Game.botMarkedCells);
            }, 1500);
        }
    
    };

    // Resets the game once the page loads and shows the choice section
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
        $('.b-reset').fadeIn();
        $('.titles--sub').html('It\'s your turn. Go wild!');
    });

    $('.game--col').click(function(e) {
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

    // Reset Button -> Clears all game variables and shows the choice section again
    $('.reset--btn').click(function(e) {
        e.preventDefault();
        Game.resetGame();
        $('.game--col').html('');
        $('.b-game').fadeOut();
        $('.b-choice').fadeIn();
        $('.b-reset').fadeOut();
    })

});