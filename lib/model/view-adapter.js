var _ = require('lodash');

var viewAdapter = {
};

viewAdapter.toView = function (table) {
    var mapColor = function (index, color) {
        return table[index].map(function (rows) {
            return rows.map(function (amount) {
                var cell = {};
                cell[color] = amount;
                return cell;
            });
        });
    };

    var blueColumns = mapColor(0, 'blue');
    var redColumns = mapColor(1, 'red');
    var blackColumns = mapColor(2, 'black');
    var greenColumns = mapColor(3, 'green');

    return _(blueColumns)
        .zipWith(redColumns, blackColumns, greenColumns, _.merge)
        .unzip()
        .reverse()
        .value();
};

viewAdapter.toModel = function (table) {
    var transposeOfTable = _(_.cloneDeep(table))
        .reverse()
        .unzip()
        .value();

    var unmapColor = function (color) {
        return transposeOfTable.map(function (rows) {
            return rows.map(function (cell) {
                return cell[color];
            });
        });
    };

    return [
        unmapColor('blue'),
        unmapColor('red'),
        unmapColor('black'),
        unmapColor('green')
    ];
};

module.exports = viewAdapter;
