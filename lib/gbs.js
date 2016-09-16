var gbs = {};

gbs.Parser = require('./grammar/parser');
gbs.Lexer = require('./lexer/lexer');
gbs.node = require('./nodes/nodes');
gbs.errors = require('./utils/errors');

var grammar = require('./grammar/grammar')(gbs);

module.exports = grammar;
