var test = require('ava');
var Context = require('../lib/model/execution-context');

var g;

function testOperation(expression, expected) {
    return function (t) {
        var context = new Context();
        var ast = g.parseExpression(expression);
        t.is(ast.eval(context), expected);
    };
}

test.beforeEach(function () {
    g = require('../lib/gbs');
});

test('Addition 1+2=3', testOperation('1+2', 3));
test('Addition 999+1=1000', testOperation('999+1', 1000));
test('Multiplication 2*3=6', testOperation('2*3', 6));
test('Division 6/2=3', testOperation('6/2', 3));
test('Division 7/2=3', testOperation('7/2', 3));
test('Mod 7%2=1', testOperation('7%2', 1));
test('Mod 6%2=0', testOperation('6%2', 0));
test('Combination (1+2)*3=9', testOperation('(1+2)*3', 9));
test('Combination 1+(2*3)=7', testOperation('1+(2*3)', 7));
test('Combination 1+2*3=9', testOperation('1+2*3', 7));
test('Combination 2*3+1=9', testOperation('2*3+1', 7));
test('Combination 6*3/2=9', testOperation('6*3/2', 9));
