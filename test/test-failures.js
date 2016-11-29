var utils = require('./_utils');

utils.testProgramFailure('boom.gbs', function (t, reason) {
    t.is(reason.message, 'El procedimiento Boom no se encuentra definido.');
    t.deepEqual(reason.on.range.start, {row: 1, column: 5});
});

utils.testProgramFailure('unknown-function.gbs', function (t, reason) {
    t.is(reason.message, 'La función "boom" no se encuentra definida.');
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});
