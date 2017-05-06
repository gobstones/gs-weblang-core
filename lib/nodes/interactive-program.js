var _ = require('lodash');

module.exports = function (node) {
    node.InteractiveProgram = function (token, body) {
        this.token = token;
        this.alias = 'interactiveProgram';
        this.body = body || [];

        // var lastSentence = _.last(this.body);
        // if (lastSentence && lastSentence.alias === 'return') {
        //     this.returnSentence = this.body.pop();
        // }
    };

    node.InteractiveProgram.prototype.interpret = function (context) {
        try {
            node.interpretBlock(this.body, context);
        } catch (err) {
            err.context = context;
            throw err;
        }
        return context;
    };
};
