module.exports = function (node) {
    node.While = function (token, expression, body) {
        this.alias = 'while';
        this.token = token;
        this.expression = expression;
        this.body = body;
    };

    node.Repeat = function (token, expression, body) {
        this.alias = 'repeat';
        Object.setPrototypeOf(this, token);
        this.expression = expression;
        this.body = body;
    };
}
;
