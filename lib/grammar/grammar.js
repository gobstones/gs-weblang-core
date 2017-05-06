var isValidKey = require('../nodes/helpers/is-valid-key');
var TOKEN_NAMES = require('./reserved-words');

module.exports = function (gbs) {
    var g = new gbs.Parser(new gbs.Lexer());
    var define = g;

    function switchCases() {
        g.advance('{');

        var cases = [];
        for (; ;) {
            var exp = g.expression(0);
            g.advance('->');
            var body = bodyStatementWithOptionalMultiline(g);
            cases.push({
                case: exp,
                body: body
            });
            if (g.token.id === '}' || !g.tokens.hasNext()) {
                break;
            }
        }
        g.advance('}');

        return cases;
    }

    function commaSeparatedArguments(parser) {
        var parameters = [];
        if (parser.token.id !== ')') {
            for (; ;) {
                parameters.push(parser.expression(0));
                if (parser.token.id !== ',') {
                    break;
                }
                parser.advance(',');
            }
        }
        return parameters;
    }

    function parameterListCall(parser) {
        parser.advance('(');
        var parameters = commaSeparatedArguments(parser);
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

    function parenthesisExpression() {
        g.advance('(');
        var p = g.expression(0);
        g.advance(')');
        return p;
    }

    function bodyStatement() {
        return g.block() || [];
    }

    function bodyStatementWithOptionalMultiline() {
        return (g.token.id === '{') ? bodyStatement() : [g.statement()];
    }

    function defineConstant(symbol, alias, value, type) {
        var token = g.symbol(symbol);
        token.nud = function () {
            return new gbs.node.Constant(token, alias, value, type);
        };
    }

    define.symbol('(end)');
    define.symbol('"');
    define.symbol('(literal)').nud = function () {
        return new gbs.node.NumericLiteral(this, this.value);
    };
    define.symbol('(bleh)').nud = function () {
        return new gbs.node.Bleh(this, this.value);
    };

    define.symbol('(name)').nud = function () {
        return new gbs.node.Variable(this, this.value);
    };

    define.op('||', 20, gbs.node.OrOperation);
    define.op('&&', 25, gbs.node.AndOperation);

    define.op('+', 50, gbs.node.SumOperation);
    define.op('-', 50, gbs.node.DiffOperation);
    define.op('*', 60, gbs.node.MulOperation);
    // TODO: chequear que efectivamente sean no asociativos
    define.op(TOKEN_NAMES.DIV, 70, gbs.node.DivOperation);
    define.op(TOKEN_NAMES.MOD, 70, gbs.node.ModOperation);

    define.infixr('^', 80, function (left) {
        return new gbs.node.ExpOperation(g.token, left, g.expression(80));
    });
    // TODO: chequear cómo se comporta el NOT
    define.prefix(TOKEN_NAMES.NOT, function () {
        return new gbs.node.NotOperation(g.token, g.expression(70));
    });
    define.prefix('-', function () {
        return new gbs.node.SubstractionOperation(g.token, g.expression(70));
    });

    define.op('==', 40, gbs.node.EqOperation);
    define.op('/=', 40, gbs.node.NotEqualOperation);
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
    define.symbol('[');
    define.symbol(']');
    define.symbol('}');
    define.symbol(',');
    define.symbol('->');
    define.symbol('..');
    define.symbol(TOKEN_NAMES.IN);
    define.symbol(TOKEN_NAMES.ELSE);
    define.symbol(TOKEN_NAMES.TO);

    var separator = {separator: ';'};
    define.stmt(';', function () {
        return separator;
    });

    define.infix('(', 80, function (left) {
        left.token = left.token || left;

        if (left.token.arity !== 'name') {
            gbs.errors.throwParserError(left, left.token.value + ' no es una función o procedimiento');
        }
        var parameters = commaSeparatedArguments(g);
        g.advance(')');
        var node;
        if (left.token.value[0].toUpperCase() === left.token.value[0]) {
            node = new gbs.node.ProcedureCall(left.token, function () {
                return g.scope.find(left.token.value);
            }, parameters);
        } else {
            node = new gbs.node.FunctionCall(left.token, function () {
                return g.scope.find(left.token.value);
            }, parameters);
        }
        return node;
    });

    define.infixr(':=', 10, function (left) {
        if (left.id !== '.' && left.id !== '[' && (!left.token || left.token.arity !== 'name')) {
            g.error(left, 'Del lado izquierdo de la asignación sólo pueden usarse identificadores');
        }
        return new gbs.node.Assignment({}, left, g.expression(9));
    });

    define.stmt(TOKEN_NAMES.DROP, function () {
        return new gbs.node.PutStone(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.GRAB, function () {
        return new gbs.node.RemoveStone(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.MOVE, function () {
        return new gbs.node.MoveClaw(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.MOVE_TO_EDGE, function () {
        return new gbs.node.MoveToEdge(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.CLEAN_BOARD, function () {
        return new gbs.node.CleanBoard(g.token, parameterListCall(g));
    });

    define.stmt(TOKEN_NAMES.BOOM, function () {
        g.advance('(');
        var token = g.token;
        var start = g.tokens.buf.indexOf('"', g.tokens.from - 1);
        if (start < 0) {
            gbs.errors.throwParserError(g.token, 'Se esperaba un mensaje de error entre comillas');
        }

        g.advance('"');
        var end = g.tokens.buf.indexOf('"', start + 1);
        if (end < 0) {
            gbs.errors.throwParserError(g.token, 'Se esperaba un cierre de comillas');
        }
        var message = g.tokens.buf.substring(start + 1, end);
        while (g.token.id !== '"') {
            g.advance(null, true);
        }
        g.advance('"');

        g.advance(')');
        return new gbs.node.Boom(token, [message]);
    });

    define.prefix(TOKEN_NAMES.HAS_STONES, function () {
        return new gbs.node.HasStones(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.NUM_STONES, function () {
        return new gbs.node.NumStones(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MAX_COLOR, function () {
        return new gbs.node.MaxColor(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MIN_COLOR, function () {
        return new gbs.node.MinColor(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MAX_DIR, function () {
        return new gbs.node.MaxDir(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MIN_DIR, function () {
        return new gbs.node.MinDir(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MAX_BOOL, function () {
        return new gbs.node.MaxBool(g.token, parameterListCall(g));
    });

    define.prefix(TOKEN_NAMES.MIN_BOOL, function () {
        return new gbs.node.MinBool(g.token, parameterListCall(g));
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
        var trueBranch = bodyStatement(g);
        var falseBranch = null;
        if (g.token.id === TOKEN_NAMES.ELSE) {
            g.scope.reserve(g.token);
            g.advance(TOKEN_NAMES.ELSE);
            falseBranch = bodyStatement(g);
        }
        return new gbs.node.If(token, condition, trueBranch, falseBranch);
    });

    define.stmt(TOKEN_NAMES.SWITCH, function () {
        var token = g.token;
        var condition = parenthesisExpression(g);
        if (g.token.id === TOKEN_NAMES.TO) {
            g.advance(TOKEN_NAMES.TO);
        }

        return new gbs.node.Switch(token, condition, switchCases());
    });

    define.stmt(TOKEN_NAMES.WHILE, function () {
        return new gbs.node.While(g.token, parenthesisExpression(g), bodyStatement(g));
    });

    define.stmt(TOKEN_NAMES.REPEAT, function () {
        return new gbs.node.Repeat(g.token, parenthesisExpression(g), bodyStatement(g));
    });

    define.stmt(TOKEN_NAMES.FOR_EACH, function () {
        // foreach dir in [minDir() .. maxDir()]
        var iterator = g.expression();
        if (iterator.token.arity !== 'name') {
            g.error(iterator.token, 'El foreach espera un identificador sobre el cual iterar');
        }
        g.advance(TOKEN_NAMES.IN);
        g.advance('[');
        var items = commaSeparatedArguments(g);
        g.advance(']');
        return new gbs.node.ForEach(g.token, iterator, items, g.block());
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

    define.root(TOKEN_NAMES.INTERACTIVE, function () {
        g.advance('program');
        var token = g.token;

        var cases = switchCases();
        cases.forEach(function (it, i) {
            if (typeof it.case.value !== 'string' || !isValidKey(it.case.value)) {
                g.error(token, 'La rama número ' + (i + 1) + ' no es una tecla válida');
            }
        });

        return new gbs.node.InteractiveProgram(token, cases);
    });

    define.root(TOKEN_NAMES.FUNCTION, function () {
        g.newScope();
        var token = g.token;
        if (g.token.arity === 'name') {
            if (g.token.value[0] !== g.token.value[0].toLowerCase()) {
                g.error(token, 'El nombre de la función ' + token.value + ' debe empezar con minúscula');
            }
            g.scope.define(token);
            g.advance();
        } else {
            g.error(token, 'Se esperaba un nombre de función');
        }
        var parameters = parameterDeclarationList(g);
        var body = bodyStatement(g);

        var ret = body.pop();
        if (!ret || ret.alias !== 'return' || !ret.expression) {
            g.error(token, 'La función ' + token.value + ' debe terminar con un ' + TOKEN_NAMES.RETURN);
        }
        g.scope.pop();
        var declaration = new gbs.node.FunctionDeclaration(token, parameters, body, ret);
        token.declaration = declaration;
        return declaration;
    });

    define.stmt(TOKEN_NAMES.RETURN, function () {
        return new gbs.node.ReturnStatement(g.token, parenthesisExpression(g));
    });

    define.root(TOKEN_NAMES.PROCEDURE, function () {
        g.newScope();
        var token = g.token;
        if (g.token.arity === 'name') {
            if (g.token.value[0] !== g.token.value[0].toUpperCase()) {
                g.error(token, 'El nombre del procedimiento ' + token.value + ' debe empezar con mayúscula');
            }
            g.scope.define(token);
            g.advance();
        } else {
            g.error(token, 'Se esperaba un nombre de procedimiento');
        }
        var parameters = parameterDeclarationList(g);
        var body = bodyStatement();
        g.scope.pop();
        var declaration = new gbs.node.ProcedureDeclaration(token, parameters, body);
        token.declaration = declaration;
        return declaration;
    });

    define.parse = function (input) {
        var program;
        var declarations = [];
        var roots = g.parseProgram(input);
        for (var i = 0; i < roots.length; i++) {
            if (roots[i].alias === 'program' || roots[i].alias === 'interactiveProgram') {
                program = roots[i];
            } else {
                declarations.push(roots[i]);
            }
        }

        return new gbs.node.Root(program, declarations);
    };

    return g;
};
