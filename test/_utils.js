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

module.exports = utils;
