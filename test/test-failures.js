var _ = require('lodash');
var utils = require('./_utils');

var messageIncludeAllDetail = function (t, error) {
    t.is(_.values(error.reason.detail).every(function (value) {
        return _.includes(error.message, value);
    }), true);
};

// INTERPRETER ERRORS:

utils.testProgramFailure('boom.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'undefined_procedure', detail: {name: 'Boomba'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 5});
});

utils.testProgramFailure('unknown-function.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'undefined_function', detail: {name: 'boom'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('unknown-function.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'undefined_function', detail: {name: 'boom'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('returning-non-numeric-exit-code.gbs', function (t, error) {
    t.is(error.message !== '', true);
    t.deepEqual(error.reason, {code: 'non_numeric_exit_code', detail: {value: [0, 1]}});
    t.deepEqual(error.on.range.start, {row: 3, column: 11});
});

utils.testProgramFailure('wrong-types/basic-move-red.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('wrong-types/move-red.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(error.on.range.start, {row: 5, column: 10});
});

utils.testProgramFailure('wrong-types/move-red-by-parameter.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('wrong-types/put-north.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}});
    t.deepEqual(error.on.range.start, {row: 5, column: 10});
});

utils.testProgramFailure('wrong-types/numberofstones-east.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 20});
});

utils.testProgramFailure('wrong-types/opposite-red.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 17});
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-1.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'inconsistent_assignment', detail: {name: 'a', expected: 'Número', actual: 'Dirección'}});
    t.deepEqual(error.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-2.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'inconsistent_assignment', detail: {name: 'a', expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(error.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('wrong-types/wrong-arity.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'wrong_arity', detail: {expected: 2, actual: 1}});
    t.deepEqual(error.on.range.start, {row: 6, column: 5});
});

utils.testProgramFailure('wrong-types/inconsistent-switch-branch-types.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Número'}});
    t.deepEqual(error.on.range.start, {row: 2, column: 9});
});

var testUnexpectedConstant = function (fileName) {
    utils.testProgramFailure(fileName, function (t, error) {
        messageIncludeAllDetail(t, error);
        t.deepEqual(error.reason, {code: 'undefined_name', detail: {name: 'cualquierCosa'}});
        t.deepEqual(error.on.range.start, {row: 1, column: 11});
    });
};

testUnexpectedConstant('unknown-constant-in-Poner.gbs');
testUnexpectedConstant('unknown-constant-in-Sacar.gbs');
testUnexpectedConstant('unknown-constant-in-Mover.gbs');

utils.testProgramFailure('unknown-literal-in-Mover.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'undefined_literal', detail: {name: 'CualquierCosa'}});
    t.deepEqual(error.on.range.start, {row: 1, column: 11});
});

utils.testProgramFailure('unknown-literal-in-any-procedure.gbs', function (t, error) {
    messageIncludeAllDetail(t, error);
    t.deepEqual(error.reason, {code: 'undefined_literal', detail: {name: 'CualquierCosa'}});
    t.deepEqual(error.on.range.start, {row: 6, column: 16});
});

// ---

// BOOM:

utils.testProgramFailure('user-boom/good-boom.gbs', function (t, error) {
    t.is(error.message, 'Ahora sí se rompe todo');
    t.is(error.reason.code, 'boom_called');
});

// ---

// PARSER ERRORS:

utils.testProgramFailure('user-boom/without-parameters.gbs', function (t, error) {
    t.is(error.message, 'Se esperaba un mensaje de error entre comillas.');
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('user-boom/with-color-as-parameter.gbs', function (t, error) {
    t.is(error.message, 'Se esperaba un mensaje de error entre comillas.');
    t.deepEqual(error.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('user-boom/with-no-closing-quote.gbs', function (t, error) {
    t.is(error.message, 'Se esperaba un cierre de comillas.');
    t.deepEqual(error.on.range.start, {row: 1, column: 11});
});

utils.testProgramFailure('interactive/wrong-keys.gbs', function (t, error) {
    t.is(error.message, 'La rama número 2 no contiene una tecla válida.');
    t.deepEqual(error.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('interactive/wrong-init-placement.gbs', function (t, error) {
    t.is(error.message, 'La rama INIT debe ir al principio.');
    t.deepEqual(error.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('interactive/wrong-timeout-placement.gbs', function (t, error) {
    t.is(error.message, 'La rama TIMEOUT(n) debe ir al final.');
    t.deepEqual(error.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('interactive/zero-timeout.gbs', function (t, error) {
    t.is(error.message, 'El argumento de TIMEOUT(n) debe ser un número entre 1 y 60000.');
    t.deepEqual(error.on.range.start, {row: 1, column: 13});
});

utils.testProgramFailure('interactive/big-timeout.gbs', function (t, error) {
    t.is(error.message, 'El argumento de TIMEOUT(n) debe ser un número entre 1 y 60000.');
    t.deepEqual(error.on.range.start, {row: 1, column: 13});
});

utils.testProgramFailure('already-defined.gbs', function (t, error) {
    t.is(error.message, 'El nombre "Hola" ya está definido.');
    t.deepEqual(error.on.range.start, {row: 7, column: 11});
});
