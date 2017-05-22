var _ = require('lodash');

module.exports = function (node) {
    node.Program = function (token, body) {
        this.token = token;
        this.alias = 'program';
        this.body = body || [];

        var lastSentence = _.last(this.body);
        if (lastSentence && lastSentence.alias === 'return') {
            this.returnSentence = this.body.pop();
        }
    };

    node.Program.prototype.interpret = function (context) {
        try {
            node.interpretBlock(this.body, context);
            this._setExitStatus(context);
        } catch (err) {
            err.context = context;
            throw err;
        }
        return context;
    };

    node.Program.prototype._setExitStatus = function (context) {
        if (this.returnSentence) {
            context.exitStatus = this.returnSentence.expression.eval(context);
            if (!_.isNumber(context.exitStatus)) {
                throw new node.errors.InterpreterException(this.returnSentence.token, {code: 'non_numeric_exit_code', detail: context.exitStatus});
            }
        }
    };
};
