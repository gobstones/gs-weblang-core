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

    node.ForEach = function (token, iterator, rangeLeft, rangeRight, body) {
        this.alias = 'foreach';
        this.token = token;
        this.iterator = iterator;
        this.rangeLeft = rangeLeft;
        this.rangeRight = rangeRight;
        this.body = body;
    };

    node.ForEach.prototype.interpret = function (context) {
        var rangeLeft = this.rangeLeft.eval(context);
        var rangeRight = this.rangeRight.eval(context);

        if (typeof rangeLeft !== typeof rangeRight) {
            node.errors.throwInterpreterError(this.token, 'El rando del foreach debe ser mismos tipos de datos');
        }

        var values = context.nativeRepresentations();
        var items = [];
        if (typeof rangeLeft === 'object') {
            if (rangeLeft[0] === values.minDir[0] && rangeLeft[1] === values.minDir[1]) {
                items = [values.north, values.east, values.south, values.west];
            } else {
                items = [values.west, values.south, values.east, values.north];
            }
        } else if (typeof rangeLeft === 'boolean') {
            if (rangeLeft) {
                items = [true, false];
            } else {
                items = [false, true];
            }
        } else if (typeof rangeLeft === 'number' && rangeLeft >= values.minColor && rangeLeft <= values.maxColor) {
            if (rangeLeft === values.minColor) {
                items = [values.blue, values.red, values.black, values.green];
            } else {
                items = [values.green, values.black, values.red, values.blue];
            }
        }

        for (var i = 0; i < items.length; i++) {
            context.put(this.iterator.token.value, items[i]);
            node.interpretBlock(this.body, context);
        }

        return context;
    };
};
