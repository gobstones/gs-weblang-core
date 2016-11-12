module.exports = function (node) {
    function evalArguments(context, parameters) {
        var results = [];
        if (parameters) {
            for (var i = 0; i < parameters.length; i++) {
                results.push(parameters[i].eval(context));
            }
        }
        return results;
    }

    function fillParameters(context, parameters, declaration) {
        // TODO: no se pueden reasignar valores a los parámetros
        if (declaration.parameters) {
            for (var i = 0; i < declaration.parameters.length; i++) {
                context.put(declaration.parameters[i].value, parameters[i]);
            }
        }
    }

    // TODO: el mundo de las variables, índices y parámetros debe ser disjunto por body!!

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
        if (!target.declaration) {
            throw new node.errors.InterpreterException('El procedimiento ' + this.name + ' no se encuentra definido.', this.node);
        }
        var declaration = target.declaration;
        var parameterValues = evalArguments(context, this.parameters);
        context.startContext();
        fillParameters(context, parameterValues, declaration);
        node.interpretBlock(declaration.body, context);
        context.stopContext();
        return context;
    };

    node.FunctionCall = function (token, declarationProvider, parameters) {
        this.token = token;
        this.arity = 'routine';
        this.alias = 'FunctionCall';
        this.name = token.value;
        this.parameters = parameters;
        this.declarationProvider = declarationProvider;
    };

    node.FunctionCall.prototype.eval = function (context) {
        var target = this.declarationProvider();
        if (!target.declaration) {
            throw new node.errors.InterpreterException('La función "' + this.name + '" no se encuentra definida.', this.node);
        }
        var declaration = target.declaration;
        var parameterValues = evalArguments(context, this.parameters);
        context.startContext();
        context.pushBoard();
        fillParameters(context, parameterValues, declaration);
        node.interpretBlock(target.body, context);
        var result = declaration.return.expression.eval(context);
        context.popBoard();
        context.stopContext();
        return result;
    };
}
;
