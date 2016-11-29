var utils = require('./_utils');

utils.testProgramFailure('boom.gbs', function (t, reason) {
    t.is(reason.message, 'El procedimiento Boom no se encuentra definido.');
    t.deepEqual(reason.on.range.start, {row: 1, column: 5});
});

utils.testProgramFailure('unknown-function.gbs', function (t, reason) {
    t.is(reason.message, 'La función "boom" no se encuentra definida.');
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});

var testUnexpectedConstant = function (fileName) {
    utils.testProgramFailure(fileName, function (t, reason) {
        t.is(reason.message, 'La variable "CualquierCosa" no existe');
        t.deepEqual(reason.on.range.start, {row: 1, column: 11});
    });
};

testUnexpectedConstant('unknown-constant-in-Poner.gbs');
testUnexpectedConstant('unknown-constant-in-Sacar.gbs');
testUnexpectedConstant('unknown-constant-in-Mover.gbs');
