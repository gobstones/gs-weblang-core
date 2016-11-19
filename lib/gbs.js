var gbs = {};
var grammar = require('./grammar/grammar');
gbs.Parser = require('./grammar/parser');
gbs.Lexer = require('./lexer/lexer');
gbs.node = require('./nodes/nodes');
gbs.errors = require('./utils/errors');
gbs.Context = require('./model/execution-context');
gbs.Gbb = {
    Reader: require('./gbb/gbb-reader'),
    Builder: require('./gbb/gbb-builder')
};

gbs.getParser = function () {
    return grammar(gbs);
};

module.exports = gbs;
