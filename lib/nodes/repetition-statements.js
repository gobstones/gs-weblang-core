module.exports = function (node) {
    node.While = function (token, expression, body) {
        this.alias = 'while';
        this.token = token;
        this.expression = expression;
        this.body = body;
    };

    node.While.prototype.interpret = function (context) {
        while (this.expression.eval(context)) {
            node.interpretBlock(this.body, context);
        }
        return context;
    };

    node.Repeat = function (token, expression, body) {
        this.alias = 'repeat';
        this.token = token;
        this.expression = expression;
        this.body = body;
    };

    node.Repeat.prototype.interpret = function (context) {
        var value = this.expression.eval(context);
        for (var i = 0; i < value; i++) {
            node.interpretBlock(this.body, context);
        }
        return context;
    };

    node.ForEach = function (token, iterator, items, body) {
        this.alias = 'foreach';
        this.token = token;
        this.iterator = iterator;
        this.items = items;
        this.body = body;
    };

    node.ForEach.prototype.interpret = function (context) {
        for (var i = 0; i < this.items.length; i++) {
            context.put(this.iterator.token.value, this.items[i].eval(context));
            node.interpretBlock(this.body, context);
        }

        return context;
    };
};
