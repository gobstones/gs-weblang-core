var test = require('ava');
var gbbReader = require('../lib/gbb/gbb-reader');
var gbbBuilder = require('../lib/gbb/gbb-builder');
var utils = require('./_utils');

test('Can generate the same results the reader read', function (t) {
    var initialGbb = utils.getFile('boards/simple-board.gbb');
    var board = gbbReader.fromString(initialGbb);
    var generatedGbb = gbbBuilder.build(board);

    var clean = function (gbb) {
        return gbb.replace(/\r\n|\r|\n/g, '\n');
    };

    t.deepEqual(clean(generatedGbb), clean(initialGbb));
});
