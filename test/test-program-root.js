var utils = require('./_utils');

utils.testProgram('constant-assignment.gbs', function (t, context) {
    t.is(context.get('a'), 3);
    t.is(context.get('b'), 6);
    t.is(context.get('c'), 9);
    t.is(context.get('d'), true);
});

utils.testProgram('repetitions.gbs', function (t, context) {
    t.is(context.get('a'), 5);
    t.is(context.get('b'), 7);
});

utils.testProgram('basic-functions.gbs', function (t, context) {
    t.is(context.get('a'), 2);
});

utils.testProgram('comments.gbs', function () {
    // it works
});

utils.testProgram('step-by-step.gbs', function (t, context) {
    var checkHeader = function (board, x, y) {
        t.is(board.x, x);
        t.is(board.y, y);
    };

    checkHeader(context.board(), 1, 0);
    var onlyName = function (it) {
        return it.split('-')[0];
    };

    var snapshots = context.board().snapshots;
    t.is(snapshots.length, 3);

    checkHeader(snapshots[0].board, 0, 1);
    t.deepEqual(snapshots[0].names, ['program']);

    checkHeader(snapshots[1].board, 1, 1);
    t.deepEqual(snapshots[1].names.map(onlyName), ['program', 'OtroContexto']);

    checkHeader(snapshots[2].board, 1, 0);
    t.deepEqual(snapshots[2].names, ['program']);
});

var testBasicProcedures = function (fileName) {
    utils.testProgram(fileName, function (t, context) {
        t.is(context.get('a'), true);
        t.is(context.get('b'), false);
        t.is(context.get('c'), false);
    });
};

testBasicProcedures('basic-procedures.gbs');
testBasicProcedures('basic-procedures-defining-procedures-first.gbs');
