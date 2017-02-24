module.exports = function (node, constants) {
    node.NumericLiteral = function (token, value) {
        this.token = token;
        this.value = value;
        this.alias = constants.NUMERIC_LITERAL;
    };
    node.NumericLiteral.prototype.type = 'number';

    node.NumericLiteral.prototype.eval = function (context, options) {
        if (!options) {
            options = {attribute: 'value'};
        }

        return options.attribute ? this[options.attribute] : this;
    };
};
