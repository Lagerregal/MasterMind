var MasterMind= MasterMind || {};

MasterMind.MasterMindAI = function () {
    var colorHelper = new MasterMind.ColorHelper();
    var mainRow = [];
    var playedRows = [];
    var playedRowsResults = [];
    var won = false;
    var thinksWeKnow = {
        colorsUsed: [],
        positions: ['', '', '', '']
    };

    /**
     * @param {number} round
     * @returns {string[]}
     */
    this.playRound = function(round) {
        var newRound = this.getNewRoundColors();
        while (this.isRowAlreadyPlayed(newRound)) {
            newRound = this.getNewRoundColors();
        }

        playedRows[round] = newRound;
        playedRowsResults[round] = this.getRoundResult(playedRows[round]);

        console.log(playedRows[round]);
        console.log(playedRowsResults[round]);

        this.analyzePlayedRound(playedRows[round], playedRowsResults[round]);
        return playedRows[round];
    };

    /**
     * @returns {string[]}
     */
    this.getNewRoundColors = function () {
        var colors = null;

        if (thinksWeKnow.colorsUsed.length === 4) {
            colors = colorHelper.shuffleAndCopyArray(thinksWeKnow.colorsUsed);
        }
        if (colors === null) {
            colors = colorHelper.getRandomColors(4);
        }
        return colors;
    };

    /**
     * @param {string[]} roundColors
     * @returns {{correctPosition: number, correctColor: number}}
     */
    this.getRoundResult = function (roundColors) {
        var currentResult = {
            correctPosition: 0,
            correctColor: 0
        };
        for (var i = 0; i < roundColors.length; i++) {
            if(mainRow[i] === roundColors[i]) {
                // correct position (and color)
                currentResult.correctPosition++;
            } else {
                // correct color
                var colorExists = false;
                for (var j = 0; j < mainRow.length && !colorExists; j++) {
                    if (mainRow[j] === roundColors[i]) {
                        colorExists = true;
                    }
                }
                if (colorExists) {
                    currentResult.correctColor++;
                }
            }
        }
        return currentResult;
    };

    /**
     * @param {string[]} currentPlayedRow
     * @param {{correctPosition: number, correctColor: number}} currentPlayedRowResult
     */
    this.analyzePlayedRound = function (currentPlayedRow, currentPlayedRowResult) {
        if (currentPlayedRowResult.correctColor === 4) {
            thinksWeKnow.colorsUsed = currentPlayedRow;
        }

        // @todo:
        // if last two rounds has correctPosition = 1
        // AND if last two rounds just one color was at the same position
        // --> move it in the next round to an other position
        // if correctPosition = 0, then we know the position of this color!

        if (currentPlayedRowResult.correctPosition === 4) {
            won = true;
        }
    };

    /**
     * @param {string[]} currentRow
     * @returns {boolean}
     */
    this.isRowAlreadyPlayed = function (currentRow) {
        var isPlayed = false;
        for (var i = 0; i < playedRows.length && !isPlayed; i++) {
            if(this.rowsAreEqual(currentRow, playedRows[i])) {
                isPlayed = true;
            }
        }
        return isPlayed;
    };

    /**
     * @param {string[]} rowA
     * @param {string[]} rowB
     * @returns {boolean}
     */
    this.rowsAreEqual = function (rowA, rowB) {
        var isSame = true;
        for (var i = 0; i < rowA.length && isSame; i++) {
            if (rowA[i] !== rowB[i]) {
                isSame = false;
            }
        }
        return isSame;
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
