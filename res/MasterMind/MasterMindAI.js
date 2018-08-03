var MasterMind= MasterMind || {};

MasterMind.MasterMindAI = function () {
    var mainRow = [];
    var playedRows = [];
    var won = false;
    var colorHelper = new MasterMind.ColorHelper();

    /**
     * @param {number} round
     * @returns {string[]}
     */
    this.playRound = function(round) {
        playedRows[round] = colorHelper.getRandomColors(4);
        this.checkWinner(playedRows[round]);
        return playedRows[round];
    };

    /**
     * @param {string[]} currentPlayedRow
     */
    this.checkWinner = function (currentPlayedRow) {
        var isSame = true;
        for (var i = 0; i < currentPlayedRow.length; i++) {
            if (currentPlayedRow[i] !== mainRow[i]) {
                isSame = false;
            }
        }
        if (isSame) {
            won = true;
        }
    };

    /**
     * @param {string[]} colors
     */
    this.setMainRow = function (colors) {
        mainRow = colors;
    };

    /**
     * @returns {boolean}
     */
    this.hasWon = function () {
        return won;
    };
};
