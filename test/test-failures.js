var utils = require('./_utils');

utils.testProgramFailure('boom.gbs', function (t, reason) {
    t.is(reason.message, 'El procedimiento Boom no se encuentra definido.');
    t.deepEqual(reason.reason, {code: 'undefined_procedure', detail: 'Boom'});
    t.deepEqual(reason.on.range.start, {row: 1, column: 5});
});

utils.testProgramFailure('unknown-function.gbs', function (t, reason) {
    t.is(reason.message, 'La función "boom" no se encuentra definida.');
    t.deepEqual(reason.reason, {code: 'undefined_function', detail: 'boom'});
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('unknown-function.gbs', function (t, reason) {
    t.is(reason.message, 'La función "boom" no se encuentra definida.');
    t.deepEqual(reason.reason, {code: 'undefined_function', detail: 'boom'});
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('returning-non-numeric-exit-code.gbs', function (t, reason) {
    t.is(reason.message, 'El programa retornó un valor no numérico.');
    t.deepEqual(reason.reason, {code: 'non_numeric_exit_code', detail: [0, 1]});
    t.deepEqual(reason.on.range.start, {row: 3, column: 11});
});

var testUnexpectedConstant = function (fileName) {
    utils.testProgramFailure(fileName, function (t, reason) {
        t.is(reason.message, 'El nombre "cualquierCosa" no existe.');
        t.deepEqual(reason.reason, {code: 'undefined_variable', detail: 'cualquierCosa'});
        t.deepEqual(reason.on.range.start, {row: 1, column: 11});
    });
};

testUnexpectedConstant('unknown-constant-in-Poner.gbs');
testUnexpectedConstant('unknown-constant-in-Sacar.gbs');
testUnexpectedConstant('unknown-constant-in-Mover.gbs');
