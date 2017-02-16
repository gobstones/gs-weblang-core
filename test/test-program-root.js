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

utils.testProgram('step-by-step.gbs', function (t, context) {
    var checkHeader = function (board, x, y) {
        t.is(board.x, x);
        t.is(board.y, y);
    };

    checkHeader(context.board(), 1, 0);

    var snapshots = context.board().snapshots;
    t.is(snapshots.length, 3);

    checkHeader(snapshots[0].board, 0, 0);
    t.is(snapshots[0].name, 'program');

    checkHeader(snapshots[1].board, 0, 1);
    t.is(snapshots[1].name.split('-')[0], 'OtroContexto');

    checkHeader(snapshots[2].board, 1, 1);
    t.is(snapshots[2].name, 'program');
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
