module.exports = function (node) {
    node.While = function (token, expression, body) {
        this.alias = 'while';
        this.prototype = token;
        this.expression = expression;
        this.body = body;
    };

    node.Repeat = function (token, expression, body) {
        this.alias = 'repeat';
        this.prototype = token;
        this.expression = expression;
        this.body = body;
    };
}
;
