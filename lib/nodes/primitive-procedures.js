module.exports = function (node, constants) {
    var getValue = function (token, parameters, context, expectedType) {
        var parameter = parameters[0];

        var finalNode = parameter.eval(context, {});
        var value = (finalNode !== undefined && finalNode.value !== undefined) ? finalNode.value : finalNode;

        // TODO: En routine-calls, al poner los argumentos en el context, se está guardando el value y no el node entero, entonces en esos casos no funciona el chequeo de tipos.
        // Y `finalNode` en lugar de ser un nodo termina siendo un número (el valor de Rojo, por ejemplo).

        if (finalNode !== undefined && finalNode.type !== undefined && finalNode.type !== expectedType) {
            throw new node.errors.InterpreterException('Se esperaba un valor de tipo "' + expectedType + '" pero se encontró uno de tipo "' + finalNode.type + '".', token, {code: 'type_mismatch', detail: {expected: expectedType, actual: finalNode.type}});
        }

        if (value === undefined) {
            var name = parameter.token.value;
            var subject = (name[0] && name[0] === name[0].toUpperCase()) ?
                {name: 'El literal', code: 'undefined_literal'} :
                {name: 'El nombre', code: 'undefined_variable'};

            throw new node.errors.InterpreterException(subject.name + ' "' + parameter.token.value + '" no existe.', parameter.token, {code: subject.code, detail: parameter.token.value});
        }

        return value;
    };

    var snapshot = function (node, context) {
        return {token: node.token, name: context.getCurrentName()};
    };

    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveClaw';
        this.parameters = parameters;
    };

    node.MoveClaw.prototype.interpret = function (context) {
        var value = getValue(this.token, this.parameters, context, 'Dirección');

        try {
            context.board().move(value, snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.RemoveStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'Grab';
        this.parameters = parameters;
    };

    node.RemoveStone.prototype.interpret = function (context) {
        var value = getValue(this.token, this.parameters, context, 'Color');

        try {
            context.board().removeStone(value, snapshot(this, context));
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };

    node.PutStone = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'Drop';
        this.parameters = parameters;
    };

    node.PutStone.prototype.interpret = function (context) {
        var value = getValue(this.token, this.parameters, context, 'Color');
        context.board().putStone(value, snapshot(this, context));
        return context;
    };

    node.MoveToEdge = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'MoveToEdge';
        this.parameters = parameters;
    };

    node.MoveToEdge.prototype.interpret = function (context) {
        var value = getValue(this.token, this.parameters, context, 'Dirección');
        context.board().moveToEdge(value, snapshot(this, context));
        return context;
    };

    node.CleanBoard = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'CleanBoard';
        this.parameters = parameters;
    };

    node.CleanBoard.prototype.interpret = function (context) {
        context.board().clear(snapshot(this, context));
        return context;
    };

    node.Boom = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.alias = 'BOOM';
        this.parameters = parameters;
    };

    node.Boom.prototype.interpret = function (context) {
        try {
            context.board().boom(this.parameters[0]);
        } catch (err) {
            err.on = this.token;
            throw err;
        }
        return context;
    };
};
