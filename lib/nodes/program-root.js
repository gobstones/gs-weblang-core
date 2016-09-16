module.exports = function (node) {
    node.Program = function (token, body) {
        this.prototype = token;
        this.alias = 'program';
        this.body = body || [];
    };

    node.Root = function (program, declarations) {
        this.alias = 'root';
        this.program = program;
        this.declarations = declarations;
    };
}
;
