var fs = require('fs');
var test = require('ava');
var Context = require('../lib/model/execution-context');
var g = require('../lib/gbs');

var utils = {};

utils.runProgram = function (fileName) {
    var file = fs.readFileSync('./_programs/' + fileName, 'utf8');
    var ast = g.getParser().parse(file);
    var context = new Context();
    ast.interpret(context);
    return context;
};

utils.testProgram = function (fileName, asserts) {
    test('Testing ' + fileName, function (t) {
        var context = utils.runProgram(fileName);
        asserts(t, context);
    });
};

utils.runStatements = function (text) {
    var statements = g.getParser().parseStatements(text);
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

utils.testOperation = function (expression, expected) {
    test(expression + ' -> ' + expected, function (t) {
        var context = new Context();
        var ast = g.getParser().parseExpression(expression);
        t.is(ast.eval(context), expected);
    });
};

utils.testOperation = function (expression, expected) {
    test(expression + ' -> ' + expected, function (t) {
        var context = new Context();
        var ast = g.getParser().parseExpression(expression);
        t.is(ast.eval(context), expected);
    });
};

module.exports = utils;
