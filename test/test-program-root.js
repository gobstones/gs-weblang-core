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
