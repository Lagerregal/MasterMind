var MasterMind= MasterMind || {};

MasterMind.ColorHelper = function () {
    /**
     * All available colors
     * @type {string[]}
     */
    this.colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'black',
        'white'
    ];

    /**
     * @param {number} count
     * @returns {string[]}
     */
    this.getRandomColors = function(count) {
        count = count || 4;
        var colors = [];
        for (var i = 0; i < count; i++) {
            var currentColor = this.getRandomColor();
            // if color is already in the set, search an other one
            while (colors.indexOf(currentColor) !== -1) {
                currentColor = this.getRandomColor();
            }
            colors.push(currentColor);
        }
        return colors;
    };

    /**
     * @returns {string}
     */
    this.getRandomColor = function () {
        return this.colors[Math.floor(Math.random() * 6)];
    };

    /**
     * @param {string[]} sourceArray
     * @return {string[]}
     */
    this.shuffleAndCopyArray = function (sourceArray) {
        var newArray = [];
        for (var i = 0; i < sourceArray.length; i++) {
            newArray.push(sourceArray[i]);
        }
        newArray.sort(function() { return 0.5 - Math.random() });
        return newArray;
    }
};
