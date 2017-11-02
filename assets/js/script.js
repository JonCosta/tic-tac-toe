$(function() {

    $('.b-choice').fadeIn();

    $('.choice--btn').click(function(e) {
        e.preventDefault();
        let side = $(this).data("choice");
        console.log(`You chose ${side}!`);
        $('.b-choice').fadeOut();
    });

});