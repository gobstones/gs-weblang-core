module.exports = function (node) {
    function evalParameters(context, parameters) {
        var results = [];
        if (parameters) {
            for (var i = 0; i < parameters.length; i++) {
                results.push(parameters[i].eval(context));
            }
        }
        return results;
    }

    function fillParameters(context, parameters, declaration) {
        if (declaration.parameters) {
            for (var i = 0; i < declaration.parameters.length; i++) {
                context.put(declaration.parameters[i].value, parameters[i]);
            }
        }
    }

    node.ProcedureCall = function (token, declarationProvider, parameters) {
        this.token = token;
        this.arity = 'routine';
        this.alias = 'ProcedureCall';
        this.name = token.value;
        this.parameters = parameters;
        this.declarationProvider = declarationProvider;
    };

    node.ProcedureCall.prototype.interpret = function (context) {
        var target = this.declarationProvider();
        if (target.arity !== 'routine') {
            throw new node.errors.InterpreterException('El procedimiento ' + this.name + ' no se encuentra definido.', this.node);
        }
        var parameterValues = evalParameters(context, this.parameters);
        context.startContext();
        fillParameters(context, parameterValues, target);
        node.interpretBlock(target.body, context);
        context.stopContext();
        return context;
    };

    node.FunctionCall = function (token, declarationProvider, parameters) {
        Object.setPrototypeOf(this, token);
        this.arity = 'routine';
        this.alias = 'FunctionCall';
        this.name = token.value;
        this.parameters = parameters;
        this.declarationProvider = declarationProvider;
    };
}
;
