$(function () {

    /**
     * First screen lets choose between X or O
     * When choosing, sets playerIcon and botIcon
     * Hides the choose a side div
     * Shows the table
     * Player clicks a square
     * Check if it's an empty square
     * Square is marked with player's symbol
     * Check the game's state
     * Create two arrays, each with the ID of the marked square
     * X: [1, 3, 6...] O: [2, 4, 5...]
     * If either player's array contains all elements in one of the winnerRows, they win
     */

    var againstBot = true;
    var gameOver = false;    
    var botIcon = '';
    var playerIcon = '';
    var currentIcon = '';
    var playerTurn = 1;

    const winnerRows = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    $('.btnSideChoice').click(function (e) { 
        e.preventDefault();
        var choice = $(this).data('choice');
        chooseASide(choice);
    });
    
    $("td").click(function () {
        if ($(this).html().length > 0 || gameOver) return false;
        $(this).html(playerIcon);
        checkGameState();
        if (gameOver) return false;
        playerTurn = playerTurn == 1 ? 2 : 1;
        currentIcon = currentIcon == 'X' ? 'O' : 'X';
        if (againstBot) {
            console.log('make a move');
            botMakeAMove();
        }
    });

    $('.btnRestart').click(function (e) { 
        e.preventDefault();
        restartGame();        
    });
    
    function chooseASide(playersChoice) {
        playerIcon = playersChoice == 'X' ? 'X' : 'O';
        botIcon = playersChoice == 'X' ? 'O' : 'X';
        currentIcon = playersChoice;
        $('.chooseASide').hide();
        $('table').show();
    }

    function botMakeAMove() {
        var freeSquares = [];
        $('td').each(function (index, element) {
            if ($(this).html().length == 0) {
                freeSquares.push(index);
            }
        });
        console.log(freeSquares);
        var square = freeSquares[Math.floor(Math.random()*freeSquares.length)];
        console.log( 'td:nth-child('+square+')');
        $('td.square'+(square)).html(botIcon);

    }

    function checkGameState() {
        var playerBoard = [];
        var botBoard = [];

        $('td').each(function (index, element) {
            if ($(this).html() == playerIcon) {
                playerBoard.push(index);
            } else if ($(this).html() == botIcon) {
                botBoard.push(index);
            }
        });

        $.each(winnerRows, function (index, element) { 
            if (containsAllElements(element, playerBoard)) {
                endGame(1);
                return false;
            } else if (containsAllElements(element, botBoard)) {
                endGame(2);
                return false;
            }
        });
        if (isBoardFull()) endGame(0);
    }

    function isBoardFull() {
        var isFull = true;
        $('td').each(function (index, element) {
            if ( $(this).html().length == 0 ) {
                isFull = false;
            } 
        });
        return isFull;
    }

    function endGame(status) {
        switch (status) {
            case 0:
                $('.endGameMessage').html("Draw!");
                break;
            case 1:
                $('.endGameMessage').html("You win!");
                break;
            case 2:
                $('.endGameMessage').html("You lose...");
                break;
        };
        gameOver = true;
        $('.endGame').fadeIn();
    }

    function containsAllElements(arrayNeedle, arrayStack) {
        for (var i = 0; i < arrayNeedle.length; i++) {
            var element = arrayNeedle[i];
            if (arrayStack.indexOf(element) < 0) return false;
        }
        return true;
    }

    function restartGame() {
        $('td').html('');
        $('table').fadeOut();
        $('.chooseASide').fadeIn();
        $('.endGame').fadeOut();
        $('.endGameMessage').html('');
        playerIcon = '';
        botIcon = '';
        playerTurn = 1;
        currentIcon = '';
        gameOver = false;
    }
    
});