var test = require('ava');
var Context = require('../lib/model/execution-context');

var g;

test.beforeEach(function () {
    g = require('../lib/gbs');
});

test('Assignment a := 2', function (t) {
    var assign = g.parseStatements('a := 2')[0];
    var context = new Context();
    assign.interpret(context);
    t.is(context.get('a'), 2);
});
