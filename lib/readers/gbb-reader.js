var Board = require('../model/model');
var stringUtils = require('../utils/string-utils');

var gbbReader = {
};

gbbReader.fromString = function (gbbString) {
    var gbbCode = this._try(gbbString);

    var rawLines = stringUtils.splitByLines(gbbCode);
    var lines = rawLines.filter(function (line) {
        return !/^GBB\/(\d\.)+\d$/.test(line) && line !== '';
    });

    return this._buildBoard(lines);
};

gbbReader._buildBoard = function (lines) {
    var dimensions = this._getDimensions(lines);
    var header = this._getHeader(lines);

    try {
        var board = new Board(dimensions[0], dimensions[1]);
        board.init();
        this._putCells(lines, board);
        board.x = header[0];
        board.y = header[1];

        return board;
    } catch (err) {
        console.log('rompió', err.stack);

        var error = new Error('Error building the board');
        error.inner = err;
        throw error;
    }
};

gbbReader._getDimensions = function (lines) {
    var dimensions = this._try(
        lines[0].match(/^size (\d+) (\d+)$/)
    );
    return this._getPositionOf(dimensions, 'dimensions');
};

gbbReader._getHeader = function (lines) {
    var header = this._try(
        lines[lines.length - 1].match(/^head (\d+) (\d+)$/)
    );
    return this._getPositionOf(header, 'header');
};

gbbReader._putCells = function (lines, board) {
    var CELL_REGEXP = /^cell (\d+) (\d+)/;

    var cellLines = lines.filter(function (line) {
        return CELL_REGEXP.test(line);
    });

    cellLines.forEach(function (line) {
        var cell = line.match(CELL_REGEXP);
        var position = this._getPositionOf(cell, line);

        board.x = position[0];
        board.y = position[1];
        this._putBalls(line, board);
    }.bind(this));
};

gbbReader._putBalls = function (line, board) {
    var values = stringUtils.scan(line, /(Azul|Negro|Rojo|Verde) (\d+)/g);
    var getAmount = function (color) {
        var value = values.filter(function (it) {
            return it[0] === color;
        });
        return parseInt((value[0] || {})[1] || 0, 0);
    };

    board.dropStones(Board.blue, getAmount('Azul'));
    board.dropStones(Board.black, getAmount('Negro'));
    board.dropStones(Board.red, getAmount('Rojo'));
    board.dropStones(Board.green, getAmount('Verde'));
};

gbbReader._getPositionOf = function (source, element) {
    return [
        this._try(source[1], element + ' x'), this._try(source[2], element + ' y')
    ].map(function (it) {
        return parseInt(it, 0);
    });
};

gbbReader._try = function (value, thingToParse) {
    if (!value) {
        throw new Error('Error parsing ' + (thingToParse || 'GBB file'));
    }
    return value;
};

module.exports = gbbReader;
