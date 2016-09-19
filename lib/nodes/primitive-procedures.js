module.exports = function (node, constants) {
    node.MoveClaw = function (token, parameters) {
        this.token = token;
        this.arity = constants.STM;
        this.name = 'MoveClaw';
        this.parameters = parameters;
    };

    node.RemoveStone = function (token, parameters) {
        Object.setPrototypeOf(this, token);
        this.arity = constants.STM;
        this.name = 'RemoveStone';
        this.parameters = parameters;
    };

    node.PutStone = function (token, parameters) {
        Object.setPrototypeOf(this, token);
        this.arity = constants.STM;
        this.name = 'PutStone';
        this.parameters = parameters;
    };

    node.Boom = function (token) {
        Object.setPrototypeOf(this, token);
        this.arity = constants.STM;
        this.name = 'BOOM';
    };
}
;
