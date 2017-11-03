var Game = {
    
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

    resetGame: function() {
        this.botChoice = this.playerChoice = '';
        this.playerMarkedCells = this.botMarkedCells = [];
    },

    checkIfGameOver: function(choiceArray) {
        if (choiceArray.length < 3) return false;
        for (let i = 0; i < Game.winningRows.length; i++) {
            let row = Game.winningRows[i];
            for (let j = 0; j < row.length; j++) {
                if (choiceArray.indexOf(row[j]) < 0) {
                    // Victory!
                }
            }
        }
        // If no winners, check for draw
        if (Game.playerMarkedCells.length + Game.botMarkedCells.length == 9) {
                
        }
    }

};

$(function() {

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
        let cell = $(this).data('cell');
        Game.playerMarkedCells.push(cell);
        console.log(Game.playerMarkedCells);
        $(this).html(Game.playerChoice);
    });

});