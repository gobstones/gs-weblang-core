var _ = require('lodash');

module.exports = function (node) {
    node.InteractiveProgram = function (token, cases) {
        this.token = token;
        this.alias = 'interactiveProgram';
        this.cases = cases || [];
    };

    node.InteractiveProgram.prototype.interpret = function (context) {
        var self = this;

        return {
            context: context,
            keys: _.map(self.cases, 'case.value'),
            onKey: function (key) {
                for (var i = 0; i < self.cases.length; i++) {
                    if (self.cases[i].case.value === key) {
                        try {
                            node.interpretBlock(self.cases[i].body, context);
                            break;
                        } catch (err) {
                            err.context = context;
                            return {error: err};
                        }
                    }
                }

                return context;
            }
        };
    };
};
