module.exports = function (node, token, parameters, context, expectedType, options) {
    var parameter = parameters[0];

    var finalNode = parameter.eval(context, {});
    var value = (finalNode !== undefined && finalNode.value !== undefined) ? finalNode.value : finalNode;

    if (finalNode !== undefined && finalNode.type !== undefined && expectedType !== undefined && finalNode.type !== expectedType) {
        throw new node.errors.InterpreterException('Se esperaba un valor de tipo "' + expectedType + '" pero se encontró uno de tipo "' + finalNode.type + '".', token, {code: 'type_mismatch', detail: {expected: expectedType, actual: finalNode.type}});
    }

    if (value === undefined) {
        var name = parameter.token.value;
        var subject = (name[0] && name[0] === name[0].toUpperCase()) ?
            {name: 'El literal', code: 'undefined_literal'} :
            {name: 'El nombre', code: 'undefined_variable'};

        throw new node.errors.InterpreterException(subject.name + ' "' + parameter.token.value + '" no existe.', parameter.token, {code: subject.code, detail: parameter.token.value});
    }

    return parameter.eval(context, options);
};
