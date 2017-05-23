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

utils.testProgramFailure('returning-non-numeric-exit-code.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'non_numeric_exit_code', detail: {value: [0, 1]}},
        {row: 3, column: 11},
        false
    );
});

utils.testProgramFailure('wrong-types/basic-move-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('wrong-types/move-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}},
        {row: 5, column: 10}
    );
});

utils.testProgramFailure('wrong-types/move-red-by-parameter.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('wrong-types/put-north.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}},
        {row: 5, column: 10}
    );
});

utils.testProgramFailure('wrong-types/numberofstones-east.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Dirección'}},
        {row: 1, column: 20}
    );
});

utils.testProgramFailure('wrong-types/opposite-red.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Dirección', actual: 'Color'}},
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

utils.testProgramFailure('wrong-types/wrong-arity.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'wrong_arity', detail: {expected: 2, actual: 1}},
        {row: 6, column: 5}
    );
});

utils.testProgramFailure('wrong-types/inconsistent-switch-branch-types.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'type_mismatch', detail: {expected: 'Color', actual: 'Número'}},
        {row: 2, column: 9}
    );
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

// ---

// BOOM:

utils.testProgramFailure('user-boom/good-boom.gbs', function (t, error) {
    t.is(error.message, 'Ahora sí se rompe todo');
    t.is(error.reason.code, 'boom_called');
});

// ---

// PARSER ERRORS:

utils.testProgramFailure('user-boom/without-parameters.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_error_message'},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('user-boom/with-color-as-parameter.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_error_message'},
        {row: 1, column: 10}
    );
});

utils.testProgramFailure('user-boom/with-no-closing-quote.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'expecting_final_quotes'},
        {row: 1, column: 11}
    );
});

utils.testProgramFailure('interactive/wrong-keys.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'invalid_key', detail: {n: 2}},
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

utils.testProgramFailure('already-defined.gbs', function (t, error) {
    utils.checkError(t, error,
        {code: 'existing_name', detail: {name: 'Hola'}},
        {row: 7, column: 11}
    );
});
