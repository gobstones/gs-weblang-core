var test = require('ava');
var utils = require('./_utils');

function testAssignment(statements, variableName, expectedValue) {
    test('Assignment ' + statements, function (t) {
        var context = utils.runStatements(statements);
        t.is(context.get(variableName), expectedValue);
    });
}

testAssignment('a := 2', 'a', 2);
testAssignment('a := True', 'a', true);
testAssignment('a := 1 + 2', 'a', 3);
testAssignment('a := 1 + 2; a := 5', 'a', 5);
testAssignment('a := 1 + 2; b := 5; a := b', 'a', 5);
testAssignment('a := 1; c := 2; b := 3; b := c; a := b', 'a', 2);
testAssignment('c := 2; b := 3; a := b + c', 'a', 5);
