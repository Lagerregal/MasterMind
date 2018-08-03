var MasterMind= MasterMind || {};

MasterMind.UiHelper = function () {
    /**
     * @param {jQuery} $row
     * @param {string[]} colors
     */
    this.setRowColors = function ($row, colors) {
        for (var i = 0; i < colors.length; i++) {
            $row.find('.field-' + i).css('background', colors[i]);
        }
    };

    /**
     * @param {jQuery} $wrapperAI
     */
    this.resetPlayedRows = function ($wrapperAI) {
        $wrapperAI.find('.field').css('background', '');
    };
};
