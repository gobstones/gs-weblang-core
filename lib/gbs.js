var gbs = {};
var grammar = require('./grammar/grammar');

gbs.Parser = require('./grammar/parser');
gbs.Lexer = require('./lexer/lexer');
gbs.node = require('./nodes/nodes');
gbs.errors = require('./utils/errors');
gbs.Context = require('./model/execution-context');
gbs.Board = require('./model/model');
gbs.i18n = require('./locales');
gbs.config = require('./config');

gbs.gbb = {
    reader: require('./gbb/gbb-reader'),
    builder: require('./gbb/gbb-builder')
};
gbs.viewAdapter = require('./model/view-adapter');

gbs.getParser = function () {
    return grammar(gbs);
};

module.exports = gbs;
