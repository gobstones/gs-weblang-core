module.exports = function (node) {
    node.InteractiveProgram = function (token, cases) {
        this.token = token;
        this.alias = 'interactiveProgram';
        this.cases = cases || [];
    };

    node.InteractiveProgram.prototype.interpret = function (context, onError) {
        var self = this;

        return {
            onKey: function (key) {
                for (var i = 0; i < self.cases.length; i++) {
                    if (self.cases[i].case.eval(context) === key) { // TODO: Sacar este eval, puede romper y no es dinámico
                        try {
                            node.interpretBlock(self.cases[i].body, context);
                            break;
                        } catch (err) {
                            err.context = context;
                            onError(err);
                        }
                    }
                }

                return context;
            }
        };
    };
};
