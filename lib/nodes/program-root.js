module.exports = function (node) {
    node.Program = function (token, body) {
        this.token = token;
        this.alias = 'program';
        this.body = body || [];
    };

    node.Program.prototype.interpret = function (context) {
        node.interpretBlock(this.body, context);
        return context;
    };

    node.Root = function (program, declarations) {
        this.alias = 'root';
        this.program = program;
        this.declarations = declarations;
    };

    node.Root.prototype.interpret = function (context) {
        this.program.interpret(context);
        return context;
    };
}
;
