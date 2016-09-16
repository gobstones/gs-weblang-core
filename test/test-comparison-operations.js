var test = require('ava');
var Context = require('../lib/model/execution-context');

var g;

function testComparison(comparison) {
    test(comparison + ' -> true', function (t) {
        var context = new Context();
        var ast = g.parseExpression(comparison);
        t.is(ast.eval(context), true);
    });
}

test.beforeEach(function () {
    g = require('../lib/gbs');
});

testComparison('1 <  2');
testComparison('1 <= 2');
testComparison('2 <= 2');
testComparison('2 <= 2');
testComparison('not (2 > 3)');
testComparison('not (2 >= 3)');
testComparison('1 == 1');
testComparison('2 == 2');
testComparison('2 != 3');
testComparison('2 != 3');
testComparison('True != False');
testComparison('True == True');
testComparison('2 + 3 == 5');
