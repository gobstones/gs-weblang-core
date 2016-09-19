module.exports = function (node) {
    node.ProcedureDeclaration = function (token, parameters, body) {
        this.token = token;
        this.name = token.value;
        this.arity = 'routine';
        this.alias = 'procedureDeclaration';
        this.parameters = parameters;
        this.body = body;
    };

    node.FunctionDeclaration = function (token, parameters, body, returnExpression) {
        this.token = token;
        this.name = token.value;
        this.arity = 'routine';
        this.alias = 'functionDeclaration';
        this.parameters = parameters;
        this.body = body;
        this.return = returnExpression;
    };
}
;