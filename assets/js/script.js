$(function () {

    var filledBlocks = [];

    var winnerRows = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ];

    $(".block").click(function () {
        let id = $(this).data("block");
        if (filledBlocks.includes(id)) return false;
        filledBlocks.push(id);
        $(this).html("X");
    });

    function checkWin() {
        // if (filledBlocks)
    }

});