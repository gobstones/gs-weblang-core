var getValue = require('./helpers/get-value');

module.exports = function (node) {
    function evalArguments(token, context, parameters, options) {
        var results = [];
        if (parameters) {
            for (var i = 0; i < parameters.length; i++) {
                var value = getValue(node, token, [parameters[i]], context, undefined, options);
                results.push(value);
            }
        }
        return results;
    }

    function fillParameters(context, parameters, declaration, node, token) {
        // TODO: no se pueden reasignar valores a los parámetros
        if (declaration.parameters) {
            if (declaration.parameters.length !== parameters.length) {
                var nameType = declaration.alias === 'procedureDeclaration' ? 'procedure' : 'function';
                throw new node.errors.InterpreterException(token, {code: 'wrong_arity', detail: {nameType: nameType, name: declaration.name, expected: declaration.parameters.length, actual: parameters.length}});
            }
            for (var i = 0; i < declaration.parameters.length; i++) {
                context.put(declaration.parameters[i].value, parameters[i], node, token);
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
            throw new node.errors.InterpreterException(this, {code: 'undefined_procedure', detail: {name: this.name}});
        }
        var declaration = target.declaration;
        var parameterValues = evalArguments(this.token, context, this.parameters, {});
        context.startContext(this.name);
        fillParameters(context, parameterValues, declaration, node, this.token);
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

    node.FunctionCall.prototype.eval = function (context, options) {
        var target = this.declarationProvider();
        if (!target.declaration) {
            throw new node.errors.InterpreterException(this.token, {code: 'undefined_function', detail: {name: this.name}});
        }
        var declaration = target.declaration;
        var parameterValues = evalArguments(this.token, context, this.parameters, {});
        context.startContext(this.name);
        context.pushBoard();
        fillParameters(context, parameterValues, declaration, node, this.token);
        node.interpretBlock(declaration.body, context);
        var result = declaration.return.expression.eval(context, options);
        context.popBoard();
        context.stopContext();
        return result;
    };
}
;
