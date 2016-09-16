module.exports = function (node, constants) {
    node.MoveClaw = function (token, parameters) {
        this.prototype = token;
        this.arity = constants.STM;
        this.name = 'MoveClaw';
        this.parameters = parameters;
    };

    node.RemoveStone = function (token, parameters) {
        this.prototype = token;
        this.arity = constants.STM;
        this.name = 'RemoveStone';
        this.parameters = parameters;
    };

    node.PutStone = function (token, parameters) {
        this.prototype = token;
        this.arity = constants.STM;
        this.name = 'PutStone';
        this.parameters = parameters;
    };

    node.Boom = function (token) {
        this.prototype = token;
        this.arity = constants.STM;
        this.name = 'BOOM';
    };
}
;
