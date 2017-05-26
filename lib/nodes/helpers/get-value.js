var _ = require('lodash');

module.exports = function (node, nameInfo, token, parameters, expectedType, evalData) {
    var calleeName = nameInfo.name;
    var calleeNameType = nameInfo.nameType;

    var parameter = parameters[0];
    if (parameter === undefined) {
        throw new node.errors.InterpreterException(token, {code: 'wrong_arity', detail: {nameType: calleeNameType, name: calleeName, expected: 1, actual: 0}});
    }

    var finalNode = parameter.eval(evalData.context, _.omit(evalData.options || {}, 'attribute'));
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
