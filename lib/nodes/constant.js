module.exports = function (node) {
    node.Constant = function (token, alias, value, type) {
        this.token = token;
        this.value = value;
        this.alias = alias;
        this.type = type;
    };

    node.Constant.prototype.eval = function (context, options) {
        if (!options) {
            options = {attribute: 'value'};
        }

        return options.attribute ? this[options.attribute] : this;
    };
}
;
