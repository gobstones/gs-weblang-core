module.exports = function (node, constants) {
    var BinaryOperation = function (token, left, right) {
        this.token = token;
        this.left = left;
        this.right = right;
        this.arity = constants.BINARY;
    };

    function defineBinaryOperation(className) {
        node[className] = function (token, left, right) {
            BinaryOperation.call(this, token, left, right);
        };
        node[className].prototype = new BinaryOperation();
    }

    defineBinaryOperation('SumOperation');
    node.SumOperation.prototype.eval = function (context) {
        return this.left.eval(context) + this.right.eval(context);
    };

    defineBinaryOperation('DiffOperation');
    node.DiffOperation.prototype.eval = function (context) {
        return this.left.eval(context) - this.right.eval(context);
    };

    defineBinaryOperation('MulOperation');
    node.MulOperation.prototype.eval = function (context) {
        return this.left.eval(context) * this.right.eval(context);
    };

    defineBinaryOperation('DivOperation');
    node.DivOperation.prototype.eval = function (context) {
        return Math.floor(this.left.eval(context) / this.right.eval(context));
    };

    defineBinaryOperation('ModOperation');
    node.ModOperation.prototype.eval = function (context) {
        return this.left.eval(context) % this.right.eval(context);
    };

    defineBinaryOperation('AndOperation');
    node.AndOperation.prototype.eval = function (context) {
        return this.left.eval(context) && this.right.eval(context);
    };

    defineBinaryOperation('OrOperation');
    node.OrOperation.prototype.eval = function (context) {
        return this.left.eval(context) || this.right.eval(context);
    };

    defineBinaryOperation('NotEqualOperation');
    node.NotEqualOperation.prototype.eval = function (context) {
        return this.left.eval(context) !== this.right.eval(context);
    };

    defineBinaryOperation('EqOperation');
    node.EqOperation.prototype.eval = function (context) {
        return this.left.eval(context) === this.right.eval(context);
    };

    defineBinaryOperation('LessOperation');
    node.LessOperation.prototype.eval = function (context) {
        return this.left.eval(context) < this.right.eval(context);
    };

    defineBinaryOperation('GraterOperation');
    node.GraterOperation.prototype.eval = function (context) {
        return this.left.eval(context) > this.right.eval(context);
    };

    defineBinaryOperation('LessEqualOperation');
    node.LessEqualOperation.prototype.eval = function (context) {
        return this.left.eval(context) <= this.right.eval(context);
    };

    defineBinaryOperation('GreaterEqualOperation');
    node.GreaterEqualOperation.prototype.eval = function (context) {
        return this.left.eval(context) >= this.right.eval(context);
    };
}
;
