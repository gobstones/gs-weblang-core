var utils = require('./_utils');

utils.testProgram('opposite.gbs', function (t, context) {
    var board = context.board();

    t.is(board.x, 1);
    t.is(board.y, 0);
});
