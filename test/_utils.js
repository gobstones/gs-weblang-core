var test = require('ava');
var Context = require('../lib/model/execution-context');
var g = require('../lib/gbs');

var utils = {};

utils.runStatements = function (text) {
    var statements = g.parseStatements(text);
    var context = new Context();
    for (var i = 0; i < statements.length; i++) {
        statements[i].interpret(context);
    }
    return context;
};

utils.testStatements = function (description, statements, variableName, expectedValue) {
    test(description + ' ==> \n' + statements, function (t) {
        var context = utils.runStatements(statements);
        t.is(context.get(variableName), expectedValue);
    });
};

module.exports = utils;
