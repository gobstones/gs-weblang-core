var _ = require('lodash');

module.exports = function (node) {
    node.InteractiveProgram = function (token, cases) {
        this.token = token;
        this.alias = 'interactiveProgram';
        this.cases = cases || [];
    };

    node.InteractiveProgram.prototype.interpret = function (context) {
        var self = this;

        var run = function (branch) {
            if (!branch) {
                return context;
            }

            try {
                node.interpretBlock(branch.body, context);
                return context;
            } catch (err) {
                err.context = context;
                return {error: err};
            }
        };

        var timeoutBranch = _.find(self.cases, function (it) {
            return it.case.timeout;
        });

        return {
            context: context,
            keys: _(self.cases)
                .filter(function (it) {
                    return !it.case.timeout && !it.case.init;
                }).map('case.value').value(),
            timeout: timeoutBranch ? timeoutBranch.case.timeout : null,
            onInit: function () {
                return run(
                    _.find(self.cases, {case: {init: true}})
                );
            },
            onKey: function (key) {
                return run(
                    _.find(self.cases, {case: {value: key}})
                );
            },
            onTimeout: function () {
                return run(timeoutBranch);
            }
        };
    };
};
