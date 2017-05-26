module.exports = function (node) {
    node.String = function (token, value) {
        this.token = token;
        this.value = value;
    };

    node.String.prototype.type = 'string';

    node.String.prototype.eval = function (context, options) {
        if (options && options.boom) {
            return this.value;
        }

        throw new node.errors.InterpreterException(this.token, {code: 'strings_only_allowed_in_boom'});
    };
};
