var test = require('ava');
var gbbReader = require('../lib/readers/gbb-reader');
var utils = require('./_utils');

test('Can build a board from a gbb file', function () {
    var board = gbbReader.fromString(utils.getFile('boards/simple-board.gbb'));
    console.log(board);
});
