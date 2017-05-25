module.exports = function (node, calleeName, token, parameters, expectedType, evalData) {
    var parameter = parameters[0];

    var finalNode = parameter.eval(evalData.context, {});
    var value = (finalNode !== undefined && finalNode.value !== undefined) ? finalNode.value : finalNode;

    if (finalNode !== undefined && finalNode.type !== undefined && expectedType !== undefined && finalNode.type !== expectedType) {
        throw new node.errors.InterpreterException(token, {code: 'call_type_mismatch', detail: {name: calleeName, expected: expectedType, actual: finalNode.type}});
    }

    if (value === undefined) {
        var name = parameter.token.value;
        var errorCode = (name[0] && name[0] === name[0].toUpperCase()) ?
            'undefined_literal' :
            'undefined_name';

        throw new node.errors.InterpreterException(parameter.token, {code: errorCode, detail: {name: parameter.token.value}});
    }

    return parameter.eval(evalData.context, evalData.options);
};
