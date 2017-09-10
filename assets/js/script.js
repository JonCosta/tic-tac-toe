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

    var playerIcon = '';
    var botIcon = '';

    const winnerRows = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ];

    $('.btnSideChoice').click(function (e) { 
        e.preventDefault();
        var choice = $(this).data('choice');
        chooseASide(choice);
    });
    
    $("td").click(function () {
        if ($(this).html().length > 0) return false;
        $(this).html(playerIcon);
        checkGameState();
        // botMakeAMove();
    });
    
    function chooseASide(playersChoice) {
        playerIcon = playersChoice == 'X' ? 'X' : 'O';
        botIcon = playersChoice == 'X' ? 'O' : 'X';
        $('.chooseASide').hide();
        $('table').show();
    }

    function botMakeAMove() {

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

        if (isBoardFull) endGame(0);

    }

    function isBoardFull() {
        $('td').each(function (index, element) {
            if ( $(this).html().length == 0) return false;
        });
        return true;
    }

    function endGame(status) {
        switch (status) {
            case 1:
                $('.endGameMessage').html("You win!");
                break;
            case 2:
                $('.endGameMessage').html("You lose...");
                break;
            default:
                $('.endGameMessage').html("Draw!");
        };
        $('.endGameMessage').fadeIn();
    }

    function containsAllElements(arrayNeedle, arrayStack) {
        return false;
    }
    
});