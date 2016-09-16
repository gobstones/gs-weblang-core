var test = require('ava');
var Context = require('../lib/model/execution-context');

var g;

function testOperation(expression, expected) {
    test(expression + ' -> ' + expected, function (t) {
        var context = new Context();
        var ast = g.parseExpression(expression);
        t.is(ast.eval(context), expected);
    });
}

test.beforeEach(function () {
    g = require('../lib/gbs');
});

testOperation('True', true);
testOperation('False', false);

testOperation('False && False', false);
testOperation('False && True', false);
testOperation('True && False', false);
testOperation('True && True', true);

testOperation('False || False', false);
testOperation('False || True', true);
testOperation('True || False', true);
testOperation('True || True', true);

testOperation('not True', false);
testOperation('not False', true);

testOperation('not False && True', true);
testOperation('not False || False', true);
