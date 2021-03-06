var config = require('../lib/config');
var utils = require('./_utils');

// INTERPRETER ERRORS:

utils.testProgramFailure('boom.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'undefined_procedure', detail: {name: 'Boomba'}},
        {row: 1, column: 5}
    );
});

utils.testProgramFailure('unknown-function.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'undefined_function', detail: {name: 'boom'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('unknown-function.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'undefined_function', detail: {name: 'boom'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('wrong-types/basic-move-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'Mover', expected: 'Dirección', actual: 'Color'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('wrong-types/move-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'Mover', expected: 'Dirección', actual: 'Color'}},
        {row: 5, column: 10}
    );
});

utils.testProgramFailure('wrong-types/move-red-by-parameter.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'Mover', expected: 'Dirección', actual: 'Color'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('wrong-types/put-north.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'Poner', expected: 'Color', actual: 'Dirección'}},
        {row: 5, column: 10}
    );
});

utils.testProgramFailure('wrong-types/numberofstones-east.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'nroBolitas', expected: 'Color', actual: 'Dirección'}},
        {row: 1, column: 20}
    );
});

utils.testProgramFailure('wrong-types/opposite-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'opuesto', expected: 'Dirección', actual: 'Color'}},
        {row: 1, column: 17}
    );
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-1.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'inconsistent_assignment', detail: {name: 'a', expected: 'Número', actual: 'Dirección'}},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('wrong-types/inconsistent-assignment-2.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'inconsistent_assignment', detail: {name: 'a', expected: 'Dirección', actual: 'Color'}},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('wrong-types/inconsistent-switch-branch-types.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Número'}},
        {row: 2, column: 9}
    );
});

utils.testProgramFailure('wrong-arity-1.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'procedure', name: 'Algo', expected: 1, actual: 2}},
        {row: 4, column: 5},
        false
    );
    t.is(error.message, 'El procedimiento Algo esperaba 1 argumento y se encontraron 2.');
});

utils.testProgramFailure('wrong-arity-2.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'procedure', name: 'Algo', expected: 2, actual: 1}},
        {row: 4, column: 5},
        false
    );
    t.is(error.message, 'El procedimiento Algo esperaba 2 argumentos y se encontró 1.');
});

utils.testProgramFailure('wrong-arity-3.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'function', name: 'algo', expected: 2, actual: 1}},
        {row: 5, column: 10},
        false
    );
    t.is(error.message, 'La función algo esperaba 2 argumentos y se encontró 1.');
});

utils.testProgramFailure('wrong-arity-primitive-procedure.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'procedure', name: 'Poner', expected: 1, actual: 0}},
        {row: 1, column: 10},
        false
    );
    t.is(error.message, 'El procedimiento Poner esperaba 1 argumento y se encontraron 0.');
});

utils.testProgramFailure('wrong-arity-primitive-function.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'function', name: 'hayBolitas', expected: 1, actual: 0}},
        {row: 1, column: 20},
        false
    );
    t.is(error.message, 'La función hayBolitas esperaba 1 argumento y se encontraron 0.');
});

var testUnexpectedConstant = function (fileName) {
    utils.testProgramFailure(fileName, function (t, error) {
        utils.checkError(t, error,
            {code: 'undefined_name', detail: {name: 'cualquierCosa'}},
            {row: 1, column: 11}
        );
    });
};

testUnexpectedConstant('unknown-constant-in-Poner.gbs');
testUnexpectedConstant('unknown-constant-in-Sacar.gbs');
testUnexpectedConstant('unknown-constant-in-Mover.gbs');

utils.testProgramFailure('unknown-literal-in-Mover.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'undefined_literal', detail: {name: 'CualquierCosa'}},
        {row: 1, column: 11}
    );
});

utils.testProgramFailure('unknown-literal-in-any-procedure.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'undefined_literal', detail: {name: 'CualquierCosa'}},
        {row: 6, column: 16}
    );
});

utils.testProgramFailure('using-string-1.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'strings_only_allowed_in_boom'},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('using-string-2.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'strings_only_allowed_in_boom'},
        {row: 1, column: 9}
    );
});

// ---

// BOOM:

utils.testProgramFailure('user-boom/good-boom.gbs', function (t, error) {
    t.is(error.message, 'Ahora sí se rompe todo');
    t.is(error.reason.code, 'boom_called');
});

utils.testProgramFailure('user-boom/good-boom-empty.gbs', function (t, error) {
    t.is(error.message, '');
    t.is(error.reason.code, 'boom_called');
});

utils.testProgramFailure('user-boom/good-boom-point.gbs', function (t, error) {
    t.is(error.message, '.');
    t.is(error.reason.code, 'boom_called');
});

// ---

// PARSER ERRORS:

utils.testProgramFailure('user-boom/without-parameters.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {nameType: 'procedure', name: 'BOOM', expected: 1, actual: 0}},
        {row: 1, column: 9},
        false
    );
    t.is(error.message, 'El procedimiento BOOM esperaba 1 argumento y se encontraron 0.');
});

utils.testProgramFailure('user-boom/with-color-as-parameter.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'call_type_mismatch', detail: {name: 'BOOM', expected: 'Mensaje de error entre comillas', actual: 'Color'}},
        {row: 1, column: 9}
    );
});

utils.testProgramFailure('user-boom/with-no-closing-quote.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_final_quotes'},
        {row: 1, column: 9}
    );
});

utils.testProgramFailure('interactive/wrong-keys.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'invalid_key', detail: {key: 'TECLA_CUALQUIERA'}},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('interactive/wrong-init-placement.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'place_init_at_the_start'},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('interactive/wrong-timeout-placement.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'place_timeout_at_the_end'},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('interactive/zero-timeout.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'timeout_outside_bounds'},
        {row: 1, column: 13}
    );
});

utils.testProgramFailure('interactive/big-timeout.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'timeout_outside_bounds'},
        {row: 1, column: 13}
    );
});

utils.testProgramFailure('already-defined-procedure.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'existing_procedure', detail: {name: 'Hola'}},
        {row: 7, column: 11}
    );
});

utils.testProgramFailure('already-defined-function.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'existing_function', detail: {name: 'hola'}},
        {row: 7, column: 10}
    );
});

utils.testProgramFailure('incomplete-parameter-list.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_parameter_name'},
        {row: 4, column: 19}
    );
});

utils.testProgramFailure('invalid-parameter-name.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'invalid_name', detail: {nameType: 'parameter', value: 2}},
        {row: 4, column: 19},
        false
    );
    t.is(error.message, '2 no es un nombre válido para un parámetro.');
});

utils.testProgramFailure('invalid-index-name.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'invalid_name', detail: {nameType: 'index', value: 9}},
        {row: 1, column: 13},
        false
    );
    t.is(error.message, '9 no es un nombre válido para un índice.');
});

utils.testProgramFailure('invalid-variable-name.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'invalid_name', detail: {nameType: 'variable', value: 3}},
        {row: 1, column: 5},
        false
    );
    t.is(error.message, '3 no es un nombre válido para una variable.');
});

utils.testProgramFailure('unexpected-token.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'unexpected_token', detail: {token: '%'}},
        {row: 1, column: 12}
    );
});

utils.testProgramFailure('not-a-function-or-procedure.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'not_a_function_or_procedure', detail: {name: 2}},
        {row: 1, column: 5}
    );
});

config.LOOP_TIMEOUT = 100;
utils.testProgramFailure('infinite-loop.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'infinite_loop', detail: {timeout: 0.1}},
        {row: 1, column: 11}
    );
});

utils.testProgramFailure('bad-expression-statement.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'bad_expression_statement'},
        {row: 2, column: 5}
    );
});

utils.testProgramFailure('expecting-function-name.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_function_name'},
        {row: 4, column: 10}
    );
});

utils.testProgramFailure('expecting-procedure-name.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_procedure_name'},
        {row: 4, column: 11}
    );
});

utils.testProgramFailure('function-must-end-with-return.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'function_must_end_with_return', detail: {name: 'a'}},
        {row: 4, column: 10}
    );
});

utils.testProgramFailure('function-name-should-start-with-lowercase.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'function_name_should_start_with_lowercase', detail: {name: 'Ae'}},
        {row: 4, column: 10}
    );
});

utils.testProgramFailure('procedure-name-should-start-with-uppercase.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'procedure_name_should_start_with_uppercase', detail: {name: 'a'}},
        {row: 4, column: 11}
    );
});

utils.testProgramFailure('no-stones.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'no_stones'},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('out-of-board.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'out_of_board', detail: {x: 1, y: 0}},
        {row: 2, column: 10}
    );
});
