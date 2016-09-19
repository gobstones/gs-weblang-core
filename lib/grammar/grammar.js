var TOKEN_NAMES = require('./reserved-words');

module.exports = function (gbs) {
    var g = new gbs.Parser(new gbs.Lexer());
    var define = g;

    function parameterListCall(parser) {
        var parameters = [];
        parser.advance('(');
        if (parser.token.id !== ')') {
            for (; ;) {
                parameters.push(parser.expression(0));
                if (parser.token.id !== ',') {
                    break;
                }
                parser.advance(',');
            }
        }
        parser.advance(')');
        return parameters;
    }

    function parameterDeclarationList() {
        var parameters = [];
        g.advance('(');
        if (g.token.id !== ')') {
            for (; ;) {
                if (g.token.arity !== 'name') {
                    g.error(g.token, 'Se esperaba un nombre de parámetro.');
                }
                parameters.push(g.token);
                g.advance();
                if (g.token.id !== ',') {
                    break;
                }
                g.advance(',');
            }
        }
        g.advance(')');
        return parameters;
    }

    function parenthesisExpression(parser) {
        parser.advance('(');
        var p = parser.expression(0);
        parser.advance(')');
        return p;
    }

    function bodyStatement(parser) {
        return (parser.token.id === '{') ? parser.block() : [parser.statement()];
    }

    function defineConstant(symbol, alias, value, type) {
        var token = g.symbol(symbol);
        token.nud = function () {
            return new gbs.node.Constant(token, alias, value, type);
        };
    }

    define.symbol('(end)');
    define.symbol('(literal)').nud = function () {
        return new gbs.node.NumericLiteral(this, this.value);
    };

    define.symbol('(name)').nud = function () {
        return new gbs.node.Variable(this, this.value);
    };

    define.op('+', 50, gbs.node.SumOperation);
    define.op('-', 50, gbs.node.DiffOperation);
    define.op('*', 60, gbs.node.MulOperation);
    define.op('/', 60, gbs.node.DivOperation);
    define.op('%', 60, gbs.node.ModOperation);

    define.op('&&', 20, gbs.node.AndOperation);
    define.op('||', 20, gbs.node.OrOperation);
    define.prefix(TOKEN_NAMES.NOT, function () {
        return new gbs.node.NotOperation(g.token, g.expression(70));
    });

    define.op('==', 40, gbs.node.EqOperation);
    define.op('!=', 40, gbs.node.NotEqualOperation);
    define.op('<', 40, gbs.node.LessOperation);
    define.op('>', 40, gbs.node.GraterOperation);
    define.op('<=', 40, gbs.node.LessEqualOperation);
    define.op('>=', 40, gbs.node.GreaterEqualOperation);

    defineConstant(TOKEN_NAMES.FALSE, 'False', false, TOKEN_NAMES.BOOLEAN);
    defineConstant(TOKEN_NAMES.TRUE, 'True', true, TOKEN_NAMES.BOOLEAN);
    defineConstant(TOKEN_NAMES.BLUE, 'Blue', 0, TOKEN_NAMES.COLOR);
    defineConstant(TOKEN_NAMES.RED, 'Red', 1, TOKEN_NAMES.COLOR);
    defineConstant(TOKEN_NAMES.BLACK, 'Black', 2, TOKEN_NAMES.COLOR);
    defineConstant(TOKEN_NAMES.GREEN, 'Green', 3, TOKEN_NAMES.COLOR);
    defineConstant(TOKEN_NAMES.NORTH, 'North', [0, 1], TOKEN_NAMES.DIRECTION);
    defineConstant(TOKEN_NAMES.SOUTH, 'South', [0, -1], TOKEN_NAMES.DIRECTION);
    defineConstant(TOKEN_NAMES.EAST, 'East', [1, 0], TOKEN_NAMES.DIRECTION);
    defineConstant(TOKEN_NAMES.WEST, 'West', [-1, 0], TOKEN_NAMES.DIRECTION);

    define.symbol(':');
    define.symbol(')');
    define.symbol('(');
    define.symbol(']');
    define.symbol('}');
    define.symbol(',');
    define.symbol('->');
    define.symbol(TOKEN_NAMES.ELSE);
    define.symbol(TOKEN_NAMES.TO);

    var separator = {separator: ';'};
    define.stmt(';', function () {
        return separator;
    });

    define.infix('(', 80, function (left) {
        if (left.arity !== 'name') {
            gbs.errors.throwParserError(left, left.value + ' no es una función o procedimiento');
        }
        var parameters = parameterListCall(g);
        var node;
        if (left.value[0].toUpperCase() === left.value[0]) {
            node = new gbs.node.ProcedureCall(left, function () {
                return g.scope.find(left.value);
            }, parameters);
        } else {
            node = new gbs.node.FunctionCall(left, function () {
                return g.scope.find(left.value);
            }, parameters);
        }
        return node;
    });

    define.infixr(':=', 10, function (left) {
        if (left.id !== '.' && left.id !== '[' && (!left.token || left.token.arity !== 'name')) {
            g.error(left, 'Bad lvalue.');
        }
        return new gbs.node.Assignment({}, left, g.expression(9));
    });

    define.stmt(TOKEN_NAMES.PUT, function () {
        return new gbs.node.PutStone(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.REMOVE, function () {
        return new gbs.node.RemoveStone(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.MOVE, function () {
        return new gbs.node.MoveClaw(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.BOOM, function () {
        var token = g.token;
        if (parenthesisExpression(g)) {
            gbs.errors.throwParserError(token, 'BOOM no lleva parámetros');
        }
        return new gbs.node.Boom(token);
    });

    define.prefix(TOKEN_NAMES.HAS_STONES, function () {
        return new gbs.node.HasStones(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.CAN_MOVE, function () {
        var id = g.token;
        var parameters = parameterListCall(g);
        return new gbs.node.CanMove(id, parameters);
    });

    define.stmt(TOKEN_NAMES.IF, function () {
        var token = g.token;
        g.advance('(');
        var condition = g.expression(0);
        g.advance(')');
        var trueBranch = bodyStatement();
        var falseBranch = null;
        if (g.token.id === TOKEN_NAMES.ELSE) {
            g.scope.reserve(g.token);
            g.advance(TOKEN_NAMES.ELSE);
            falseBranch = bodyStatement();
        }
        return new gbs.node.If(token, condition, trueBranch, falseBranch);
    });

    define.stmt(TOKEN_NAMES.SWITCH, function () {
        var token = g.token;
        var condition = parenthesisExpression();
        if (g.token.id === TOKEN_NAMES.TO) {
            g.advance(TOKEN_NAMES.TO);
        }
        g.advance('{');
        var cases = [];
        for (; ;) {
            var exp = g.expression(0);
            g.advance('->');
            var body = bodyStatement();
            cases.push({
                case: exp,
                body: body
            });
            if (g.token.id === '}' || !g.tokens.hasNext()) {
                break;
            }
        }
        g.advance('}');
        return new gbs.node.Switch(token, condition, cases);
    });

    define.stmt(TOKEN_NAMES.WHILE, function () {
        return new gbs.node.While(g.token, parenthesisExpression(), bodyStatement());
    });

    define.stmt(TOKEN_NAMES.REPEAT, function () {
        return new gbs.node.Repeat(g.token, parenthesisExpression(), bodyStatement());
    });

    define.stmt('{', function () {
        var a = g.statements();
        g.advance('}');
        return a;
    });

    define.stmt('(', function () {
        var a = g.statements();
        g.advance(')');
        return a;
    });

    define.prefix('(', function () {
        var expression = g.expression(0);
        g.advance(')');
        return expression;
    });

    define.root(TOKEN_NAMES.PROGRAM, function () {
        return new gbs.node.Program(g.token, g.block());
    });

    define.root(TOKEN_NAMES.FUNCTION, function () {
        g.newScope();
        var token = g.token;
        if (g.token.arity === 'name') {
            if (g.token.value[0] !== g.token.value[0].toLowerCase()) {
                g.error(token, 'El nombre de la función ' + token.value + ' debe emepzar con minúscula');
            }
            g.scope.define(g.token);
            g.advance();
        } else {
            g.error(token, 'Se esperaba un nombre de función');
        }
        var parameters = parameterDeclarationList();
        var body = bodyStatement();
        var ret = body.pop();
        if (!ret || ret.alias !== 'return' || !ret.expression) {
            g.error(token, 'La función ' + token.value + ' debe terminar con un ' + TOKEN_NAMES.RETURN);
        }
        g.scope.pop();
        var declaration = new gbs.node.FunctionDeclaration(token, parameters, body, ret.expression);
        declaration.std = function () {
            return declaration;
        };
        return declaration;
    });

    define.stmt(TOKEN_NAMES.RETURN, function () {
        if (g.token.id !== ';') {
            this.alias = 'return';
            this.expression = parenthesisExpression();
        }
        return this;
    });

    define.root(TOKEN_NAMES.PROCEDURE, function () {
        g.newScope();
        var token = g.token;
        if (g.token.arity === 'name') {
            if (g.token.value[0] !== g.token.value[0].toUpperCase()) {
                g.error(token, 'El nombre del procedimiento ' + token.value + ' debe emepzar con mayúscula');
            }
            g.scope.define(g.token);
            g.advance();
        } else {
            g.error(token, 'Se esperaba un nombre de procedimiento');
        }
        var parameters = parameterDeclarationList();
        var body = bodyStatement();
        g.scope.pop();
        var declaration = new gbs.node.ProcedureDeclaration(token, parameters, body);
        declaration.std = function () {
            return declaration;
        };
        return declaration;
    });

    define.parse = function (input) {
        var main;
        var declarations = [];
        var roots = g.parseProgram(input);
        for (var i = 0; i < roots.length; i++) {
            if (roots[i].alias === 'program') {
                main = roots[i];
            } else {
                declarations.push(roots[i]);
            }
        }
        return new gbs.node.Root(main, declarations);
    };

    return g;
};

