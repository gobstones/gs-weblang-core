module.exports = function (node, token, parameters, context, expectedType, options) {
    var parameter = parameters[0];

    var finalNode = parameter.eval(context, {});
    var value = (finalNode !== undefined && finalNode.value !== undefined) ? finalNode.value : finalNode;

    if (finalNode !== undefined && finalNode.type !== undefined && expectedType !== undefined && finalNode.type !== expectedType) {
        node.errors.throwTypeMismatch(token, expectedType, finalNode.type);
    }

    if (value === undefined) {
        var name = parameter.token.value;
        var subject = (name[0] && name[0] === name[0].toUpperCase()) ?
            {name: 'El literal', code: 'undefined_literal'} :
            {name: 'El nombre', code: 'undefined_variable'};

        throw new node.errors.InterpreterException(subject.name + ' "' + parameter.token.value + '" no existe.', parameter.token, {code: subject.code, detail: {name: parameter.token.value}});
    }

    return parameter.eval(context, options);
};
