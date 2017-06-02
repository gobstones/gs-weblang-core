var utils = require('./_utils');

var boardIsIn10 = function (t, context) {
    var board = context.board();

    t.is(board.x, 1);
    t.is(board.y, 0);
};

utils.testProgram('opposite.gbs', boardIsIn10);
utils.testProgram('moving-opposite-direction-variable.gbs', boardIsIn10);
