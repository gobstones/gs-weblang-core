var test = require('ava');
var gbbReader = require('../lib/gbb/gbb-reader');
var utils = require('./_utils');

test('Can build a board from a gbb file', function (t) {
    var board = gbbReader.fromString(utils.getFile('boards/simple-board.gbb'));

    t.is(board.x, 1);
    t.is(board.y, 2);

    t.is(board.sizeX, 4);
    t.is(board.sizeY, 3);

    t.deepEqual(board.table, [
        [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 2]],
        [[0, 0, 0], [0, 0, 8], [0, 0, 0], [0, 0, 5]],
        [[0, 0, 0], [0, 0, 0], [0, 6, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 1]]
    ]);
});

test('Fails if no code is given', function (t) {
    t.throws(function () {
        gbbReader.fromString(null);
    }, 'Error parsing GBB file');
});

test('Fails if the head is malformed', function (t) {
    t.throws(function () {
        gbbReader.fromString(utils.getFile('boards/malformed-board.gbb'));
    }, 'Error parsing header');
});

test('Fails if the gbb has wrong positions', function (t) {
    t.throws(function () {
        gbbReader.fromString(utils.getFile('boards/incoherent-board.gbb'));
    }, 'Error building the board');
});
