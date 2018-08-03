$( document ).ready(function() {
    var $wrapper = $('.wrapper');
    var $mainRow = $wrapper.find('.main-row');
    var uiHelper = new MasterMind.UiHelper();
    var colorHelper = new MasterMind.ColorHelper();
    var mainColors = [];

    // click button for random main colors
    $('.main-row-button-random').click(function() {
        mainColors = colorHelper.getRandomColors(4);
        uiHelper.setRowColors($mainRow, mainColors);
    });

    // click button for run game
    $('.button-run-ai').click(function() {
        uiHelper.resetPlayedRows($wrapper.find('.wrapper-ai'));
        var ai = new MasterMind.MasterMindAI();
        ai.setMainRow(mainColors);

        var round = 0;
        while (round < 12 && !ai.hasWon()) {
            uiHelper.setRowColors($wrapper.find('.ai-row-' + round), ai.playRound(round));
            round++;
        }
        if (ai.hasWon()) {
            alert('Won!');
        }
    });
});
