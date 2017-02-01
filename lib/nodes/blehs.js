module.exports = function (node) {
    node.Bleh = function (token, value) {
        this.token = token;
        this.value = value;
    };
    node.Bleh.prototype.type = 'bleh';
};
