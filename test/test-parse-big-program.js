var utils = require('./_utils');

utils.testProgram('big-program.gbs', function (t, context) {
    t.is(context.get('a'), 3);
});
