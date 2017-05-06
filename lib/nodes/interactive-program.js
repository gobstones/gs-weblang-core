// var _ = require('lodash');

module.exports = function (node) {
    node.InteractiveProgram = function (token, cases) {
        this.token = token;
        this.alias = 'interactiveProgram';
        this.cases = cases || [];
    };

    // node.InteractiveProgram.prototype.interpret = function (context) {
    //     var value = this.expression.eval(context);
    //     for (var i = 0; i < this.cases.length; i++) {
    //         if (this.cases[i].case.eval(context) === value) {
    //             node.interpretBlock(this.cases[i].body, context);
    //             break;
    //         }
    //     }
    //     return context;
    // };

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
