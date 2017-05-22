var utils = require('./_utils');

utils.testProgramFailure('boom.gbs', function (t, reason) {
    t.is(reason.message, 'El procedimiento Boomba no se encuentra definido.');
    t.deepEqual(reason.reason, {code: 'undefined_procedure', detail: 'Boomba'});
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

utils.testProgramFailure('wrong-types/basic-move-red.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Dirección" pero se encontró uno de tipo "Color".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('wrong-types/move-red.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Dirección" pero se encontró uno de tipo "Color".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(reason.on.range.start, {row: 5, column: 10});
});

utils.testProgramFailure('wrong-types/move-red-by-parameter.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Dirección" pero se encontró uno de tipo "Color".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(reason.on.range.start, {row: 1, column: 10});
});

utils.testProgramFailure('wrong-types/put-north.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Color" pero se encontró uno de tipo "Dirección".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}});
    t.deepEqual(reason.on.range.start, {row: 5, column: 10});
});

utils.testProgramFailure('wrong-types/numberofstones-east.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Color" pero se encontró uno de tipo "Dirección".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}});
    t.deepEqual(reason.on.range.start, {row: 1, column: 20});
});

utils.testProgramFailure('wrong-types/opposite-red.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Dirección" pero se encontró uno de tipo "Color".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(reason.on.range.start, {row: 1, column: 17});
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-1.gbs', function (t, reason) {
    t.is(reason.message, 'No se puede asignar a "a" un valor de tipo "Dirección" ya que es de tipo "Número".');
    t.deepEqual(reason.reason, {code: 'inconsistent_assignment', detail: {expected: 'Número', actual: 'Dirección'}});
    t.deepEqual(reason.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-2.gbs', function (t, reason) {
    t.is(reason.message, 'No se puede asignar a "a" un valor de tipo "Color" ya que es de tipo "Dirección".');
    t.deepEqual(reason.reason, {code: 'inconsistent_assignment', detail: {expected: 'Dirección', actual: 'Color'}});
    t.deepEqual(reason.on.range.start, {row: 2, column: 5});
});

utils.testProgramFailure('wrong-types/wrong-arity.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaban 2 argumentos pero se obtuvieron 1.');
    t.deepEqual(reason.reason, {code: 'wrong_arity', detail: {expected: 2, actual: 1}});
    t.deepEqual(reason.on.range.start, {row: 6, column: 5});
});

utils.testProgramFailure('wrong-types/inconsistent-switch-branch-types.gbs', function (t, reason) {
    t.is(reason.message, 'Se esperaba un valor de tipo "Color" pero se encontró uno de tipo "Número".');
    t.deepEqual(reason.reason, {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Número'}});
    t.deepEqual(reason.on.range.start, {row: 2, column: 9});
});

utils.testProgramFailure('user-boom/good-boom.gbs', function (t, reason) {
    t.is(reason.message, 'Ahora sí se rompe todo');
    t.is(reason.reason.code, 'boom_called');
});

utils.testProgramFailure('user-boom/without-parameters.gbs', function (t, reason) {
    t.is(reason.error, 'Se esperaba un mensaje de error entre comillas');
});

utils.testProgramFailure('user-boom/with-color-as-parameter.gbs', function (t, reason) {
    t.is(reason.error, 'Se esperaba un mensaje de error entre comillas');
});

utils.testProgramFailure('user-boom/with-no-closing-quote.gbs', function (t, reason) {
    t.is(reason.error, 'Se esperaba un cierre de comillas');
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

utils.testProgramFailure('unknown-literal-in-Mover.gbs', function (t, reason) {
    t.is(reason.message, 'El literal "CualquierCosa" no existe.');
    t.deepEqual(reason.reason, {code: 'undefined_literal', detail: 'CualquierCosa'});
    t.deepEqual(reason.on.range.start, {row: 1, column: 11});
});

utils.testProgramFailure('unknown-literal-in-any-procedure.gbs', function (t, reason) {
    t.is(reason.message, 'El literal "CualquierCosa" no existe.');
    t.deepEqual(reason.reason, {code: 'undefined_literal', detail: 'CualquierCosa'});
    t.deepEqual(reason.on.range.start, {row: 6, column: 16});
});

utils.testProgramFailure('interactive/wrong-keys.gbs', function (t, reason) {
    t.is(reason.error, 'La rama número 2 no contiene una tecla válida');
});

utils.testProgramFailure('interactive/wrong-init-placement.gbs', function (t, reason) {
    t.is(reason.error, 'La rama INIT debe ir al principio');
});

utils.testProgramFailure('interactive/wrong-timeout-placement.gbs', function (t, reason) {
    t.is(reason.error, 'La rama TIMEOUT(n) debe ir al final');
});

utils.testProgramFailure('interactive/zero-timeout.gbs', function (t, reason) {
    t.is(reason.error, 'El argumento de TIMEOUT(n) debe ser un número entre 1 y 60000');
});

utils.testProgramFailure('interactive/big-timeout.gbs', function (t, reason) {
    t.is(reason.error, 'El argumento de TIMEOUT(n) debe ser un número entre 1 y 60000');
});

utils.testProgramFailure('already-defined.gbs', function (t, reason) {
    t.is(reason.error, 'El nombre "Hola" ya está definido');
    t.deepEqual(reason.on.range.start, {row: 7, column: 11});
});
