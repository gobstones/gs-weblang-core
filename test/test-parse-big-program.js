var utils = require('./_utils');

utils.testProgram('big-program.gbs', function (t, context) {
    t.is(context.get('a'), 3);
    console.log(context);
    t.is(context.exitStatus, 6);
});

utils.testProgram('functions-with-arguments.gbs', function (t, context) {
    t.is(context.get('a'), 6);
    t.is(context.get('b'), 4);
    t.is(context.get('c'), 3);
    t.is(context.get('d'), 7);
});
