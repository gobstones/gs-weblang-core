var _ = require('lodash');

module.exports = function (node) {
    node.Program = function (token, body) {
        this.token = token;
        this.alias = 'program';
        this.body = body || [];

        var lastSentence = _.last(this.body);
        if (lastSentence.alias === 'return') {
            this.returnSentence = this.body.pop();
        }
    };

    node.Program.prototype.interpret = function (context) {
        node.interpretBlock(this.body, context);
        this._setExitStatus(context);
        return context;
    };

    node.Program.prototype._setExitStatus = function (context) {
        if (this.returnSentence) {
            context.exitStatus = this.returnSentence.expression.eval(context);
            if (!_.isNumber(context.exitStatus)) {
                throw new node.errors.InterpreterException('El programa retornó un valor no numérico.', this.returnSentence.token, {code: 'non_numeric_exit_code', detail: context.exitStatus});
            }
        }
    };

    node.Root = function (program, declarations) {
        this.alias = 'root';
        this.program = program;
        this.declarations = declarations;
    };

    node.Root.prototype.interpret = function (context) {
        this.program.interpret(context);
        return context;
    };
};
