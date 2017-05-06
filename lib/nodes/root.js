module.exports = function (node) {
    node.Root = function (program, declarations) {
        this.alias = 'root';
        this.program = program;
        this.declarations = declarations;
    };

    node.Root.prototype.interpret = function (context) {
        return this.program.interpret(context);
    };
};
