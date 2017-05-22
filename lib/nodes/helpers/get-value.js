module.exports = function (node, token, parameters, context, expectedType, options) {
    var parameter = parameters[0];

    var finalNode = parameter.eval(context, {});
    var value = (finalNode !== undefined && finalNode.value !== undefined) ? finalNode.value : finalNode;

    if (finalNode !== undefined && finalNode.type !== undefined && expectedType !== undefined && finalNode.type !== expectedType) {
        node.errors.throwTypeMismatch(token, expectedType, finalNode.type);
    }

    if (value === undefined) {
        var name = parameter.token.value;
        var errorCode = (name[0] && name[0] === name[0].toUpperCase()) ?
            'undefined_literal' :
            'undefined_name';

        throw new node.errors.InterpreterException(parameter.token, {code: errorCode, detail: {name: parameter.token.value}});
    }

    return parameter.eval(context, options);
};
