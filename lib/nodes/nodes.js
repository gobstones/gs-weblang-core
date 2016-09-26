var node = {};
node.errors = require('../utils/errors');

var constants = {
    STM: 'statement',
    BINARY: 'binary',
    EXPRESSION: 'binary'
};

node.interpretBlock = function (block, context) {
    block = block || [];
    for (var i = 0; i < block.length; i++) {
        try {
            block[i].interpret(context);
        } catch (err) {
            throw new Error(block[i].length);
        }
    }
    return context;
};

require('./literals')(node, constants);
require('./constant')(node, constants);
require('./variable')(node, constants);
require('./assignment')(node, constants);
require('./conditional-statements')(node, constants);
require('./binary-operations')(node, constants);
require('./unary-operations')(node, constants);
require('./primitive-functions')(node, constants);
require('./primitive-procedures')(node, constants);
require('./routine-calls')(node, constants);
require('./repetition-statements')(node, constants);
require('./program-root')(node, constants);

module.exports = node;
