// TOKENS

var TOKEN_NAMES = {
    WHILE: 'while',
    IF: 'if',
    ELSE: 'else',
    SWITCH: 'switch',
    REPEAT: 'repeat',
    FUNCTION: 'function',
    PROCEDURE: 'procedure',
    PROGRAM: 'program',
    PUT: 'Poner',
    REMOVE: 'Sacar',
    HAS_STONES: 'hayBolitas',
    CAN_MOVE: 'puedeMover',
    MOVE: 'Mover',
    BOOM: 'BOOM',
    RETURN: 'return',
    RED: 'Rojo',
    BLUE: 'Azul',
    BLACK: 'Negro',
    GREEN: 'Verde',
    TRUE: 'True',
    NOT: 'not',
    TO: 'to',
    FALSE: 'False',
    NORTH: 'Norte',
    SOUTH: 'Sur',
    EAST: 'Este',
    WEST: 'Oeste',
    BOOLEAN: 'Booleano',
    COLOR: 'Color',
    DIRECTION: 'Dirección',
    NUMBER: 'Número'
};

// LEXER
function Lexer(prefix, suffix) {
    // Current reading position
    this.from = 0;
    this.startColumn = 0;
    this.endColumn = 0;
    this.row = 0;
    this.prefix = prefix || '!=-<>:|&';
    this.suffix = suffix || '=|&>';

    this.punctuators = '+-*.:%|!?#&;,()<>{}[]=';

    // Look ahead position
    this.i = 0;

    this.buf = null;
    this.buflen = 0;
}

Lexer.prototype.hasNext = function () {
    this._skipNonTokens();
    return this.from < this.buflen;
};

Lexer.prototype.input = function (buf) {
    this.from = 0;
    this.i = 0;
    this.startColumn = 0;
    this.endColumn = 0;
    this.row = 0;
    this.buf = buf;
    this.buflen = buf.length;
    this.current = null;
    this.nextChar = null;
};

var TokenTypes = {
    IDENTIFIER: 'name',
    OPERATOR: 'operator',
    EOF: 'eof',
    COMMENT: 'comment',
    NUMBER: 'number',
    NEWLINE: 'newline'
};

/**
 * This method is highly procedural for performance reasons.
 * There is no need for the lexer to be too flexible, since the
 * semantics will be associated to identifiers on the parser.
 *
 * @returns Token. The next token on the buffer, or null if the buffer is empty.
 */
Lexer.prototype.next = function () {
    do {
        this._skipNonTokens();
        this._refreshCurrentAndNextChars();

        if (this.from >= this.buflen) {
            return null;
        }
    } while (this._processComment());

    // Always add cases in descending order of occurrence probability
    if (this._processIdentifier()) {
        return this._consume(TokenTypes.IDENTIFIER);
    } else if (this._processOperator()) {
        return this._consume(TokenTypes.OPERATOR);
    } else if (this._processNumber()) {
        return this._consume(TokenTypes.NUMBER);
    }
    return this._processError();
};

// PRIVATE

function error(token, description) {
    return {error: description, on: token};
}

Lexer.prototype._make = function (type, value) {
    return {
        type: type,
        value: value,
        range: {
            start: {row: this.row, column: this.startColumn},
            end: {row: this.row, column: this.endColumn}
        }
    };
};

Lexer.prototype._consume = function (type) {
    var text = this.buf.substring(this.from, this.i);
    var newToken = this._make(type, text);
    this.from = this.i;
    this.startColumn = this.endColumn;
    return newToken;
};

Lexer.prototype._refreshCurrentAndNextChars = function () {
    this.current = this.buf.charAt(this.from);
    this.nextChar = this.buf.charAt(this.from + 1);
};

Lexer.prototype._processOperator = function () {
    if (this.punctuators.indexOf(this.current) >= 0) {
        this._increaseFrom();
        this._processMultiCharOperator();
        return true;
    }
    return false;
};

Lexer.prototype._processMultiCharOperator = function () {
    if (this.prefix.indexOf(this.current) >= 0 && this.suffix.indexOf(this.nextChar) >= 0) {
        this._incrementStep();
    }
};

Lexer.prototype._processNumber = function () {
    if (_isDigit(this.current)) {
        this._increaseFrom();
        while (this.i < this.buflen && _isDigit(this.buf.charAt(this.i))) {
            this._incrementStep();
        }
        return true;
    }
    return false;
};

Lexer.prototype._processError = function () {
    this._increaseFrom();
    return error('Unmatched token', this._consume('UNMATCHED'));
};

Lexer.prototype._resetColumnCount = function () {
    this.startColumn = this.endColumn;
};

Lexer.prototype._increaseFrom = function () {
    this.i = this.from + 1;
    this.startColumn = this.startColumn + 1;
    this.endColumn = this.startColumn;
};

Lexer.prototype._incrementStep = function () {
    this.i++;
    this.endColumn++;
};

Lexer.prototype._processIdentifier = function () {
    if (_isAlpha(this.current)) {
        this._increaseFrom();
        while (this.i < this.buflen && _isAlphanum(this.buf.charAt(this.i))) {
            this._incrementStep();
        }
        return true;
    }
    return false;
};

Lexer.prototype._skipNonTokens = function () {
    while (this.from < this.buflen) {
        var c = this.buf.charAt(this.from);
        if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
            if (_isNewline(c)) {
                this.row += 1;
                this.endColumn = 0;
                this.startColumn = 0;
            } else {
                this.startColumn++;
                this.endColumn = this.startColumn;
            }
            this.from++;
            this.i = this.from;
        } else {
            break;
        }
    }
};

Lexer.prototype._processComment = function () {
    var chars = this.current + this.nextChar;
    return this._processSingleLineComment(chars) || this._processMultiLineComment(chars);
};

Lexer.prototype._processSingleLineComment = function (chars) {
    if (chars === '//') {
        while (this.i < this.buflen && !_isNewline(this.buf.charAt(this.i))) {
            this._incrementStep();
        }
        this.from = this.i;
        this.row++;
        this.startColumn = 0;
        this.endColumn = 0;
        return true;
    }
};

Lexer.prototype._processMultiLineComment = function (chars) {
    if (chars === '/*') {
        this._incrementStep();
        this._incrementStep();
        while (this.i < this.buflen && this.buf.charAt(this.i) !== '*' && this.buf.charAt(this.i + 1) !== '/') {
            this._incrementStep();
            if (_isNewline(this.buf.charAt(this.i))) {
                this.endColumn = 0;
            }
        }
        this._incrementStep();
        this._incrementStep();
        this.from = this.i;
        this.endColumn = this.startColumn;
        return true;
    }
    return false;
};

function _isNewline(c) {
    return c === '\r' || c === '\n';
}

function _isDigit(c) {
    return c >= '0' && c <= '9';
}

function _isAlpha(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || c === '$';
}

function _isAlphanum(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '_' || c === '$';
}

/**********************************************************************************************************************/
/************************************************* SCOPE **************************************************************/
/**********************************************************************************************************************/

function itself() {
    return this;
}

var log = (console && console.log) ? console.log : function () {
};

function throwParserError(token, description) {
    var someError = {error: description, on: token};
    log('PARSER ERROR: ', someError);
    throw someError;
}

var Scope = function (parser) {
    this.parser = parser;
    this.def = {};
};
Scope.prototype.define = function (name) {
    var t = this.def[name.value];
    if (typeof t === 'object') {
        throwParserError(name, t.reserved ? 'Already reserved.' : 'Already defined.');
    }
    this.def[name.value] = name;
    name.reserved = false;
    name.nud = itself;
    name.led = null;
    name.std = null;
    name.lbp = 0;
    name.scope = self.scope;
    return name;
};
Scope.prototype.find = function (name) {
    var e = this;
    var targetToken;
    for (; ;) {
        targetToken = e.def[name];
        if (targetToken && typeof targetToken !== 'function') {
            return e.def[name];
        }
        e = e.parent;
        if (!e) {
            targetToken = this.parser.symbolTable[name];
            return targetToken && typeof targetToken !== 'function' ? targetToken : symbolTable['(name)'];
        }
    }
};
Scope.prototype.pop = function () {
    this.scope = this.parent;
};
Scope.prototype.reserve = function (name) {
    if (name.arity !== 'name' || name.reserved) {
        return;
    }
    var t = this.def[name.value];
    if (t) {
        if (t.reserved) {
            return;
        }
        if (t.arity === 'name') {
            name.error('Already defined.');
        }
    }
    this.def[name.value] = name;
    name.reserved = true;
};

/**********************************************************************************************************************/
/************************************************ PARSER **************************************************************/
/**********************************************************************************************************************/

function throwUndefinedSymbolError() {
    throwParserError(this, 'No definido');
}

function throwMissingOperatorError() {
    throwParserError(this, 'No se encontró el operador');
}

var OriginalSymbol = function () {
    this.nud = throwUndefinedSymbolError;
    this.led = throwMissingOperatorError;
};

var gbs = {};

gbs.Parser = function (lexer) {
    this.scope = null;
    this.token = null;
    this.tokens = lexer;
    this.symbolTable = {};
};

gbs.Parser.prototype.symbol = function (id, bindingPower) {
    var s = this.symbolTable[id];
    bindingPower = bindingPower || 0;
    if (s) {
        if (bindingPower > s.lbp) {
            s.lbp = bindingPower;
        }
    } else {
        s = new OriginalSymbol();
        s.id = s.value = id;
        s.lbp = bindingPower;
        this.symbolTable[id] = s;
    }
    return s;
};

gbs.Parser.prototype.expression = function (rightBindingPower) {
    rightBindingPower = rightBindingPower | 0;
    var left;
    var t = this.token;
    this.advance();
    left = t.nud();
    while (rightBindingPower < this.token.lbp) {
        t = this.token;
        this.advance();
        left = t.led(left);
    }
    return left;
};

gbs.Parser.prototype.newScope = function () {
    var s = this.scope;
    this.scope = new Scope(this);
    this.scope.parent = s;
    return this.scope;
};

gbs.Parser.prototype.advance = function (id) {
    var a;
    var o;
    var t;
    var v;
    var tokens = this.tokens;
    if (id && this.token.id !== id) {
        if (this.lastToken && this.lastToken.range && this.token.range) {
            this.token.range.start = this.lastToken.range.start;
        }
        throwParserError(this.token, 'Se esperaba "' + id + '" pero se encontró "' + this.token.value + '"');
    }
    if (!tokens.hasNext()) {
        var lastRange = this.token.range;
        this.token = this.symbolTable['(end)'];
        this.token.range = lastRange;
        return this.token;
    }
    t = tokens.next();
    v = t.value;
    a = t.type;
    if (a === 'name') {
        o = this.scope.find(v);
        if (o.arity === 'routine') {
            // force late binding
            o = this.symbolTable['(name)'];
        }
    } else if (a === 'operator') {
        o = this.symbolTable[v];
        if (!o) {
            throwParserError(t, 'Unknown operator.');
        }
    } else if (a === 'number') {
        o = this.symbolTable['(literal)'];
        a = 'literal';
        v = parseInt(v, 10);
    } else {
        throwParserError(t, 'Unexpected token.');
    }


    var token = Object.create(o);
    token.range = t.range;
    token.value = v;
    token.arity = a;
    this.lastToken = this.token;
    this.token = token;
    log('o: ', token);
    return token;
};

gbs.Parser.prototype.constant = function (symbol, alias, value, type) {
    var x = this.symbol(symbol);
    var self = this;
    x.nud = function () {
        return new gbs.node.Constant(x, alias, value, type);
    };
    x.value = value;
    return x;
};

gbs.Parser.prototype.op = function (id, bp, OpDefinition) {
    var parser = this;
    var s = this.symbol(id, bp);
    s.led = function (left) {
        return new OpDefinition(this, left, parser.expression(bp));
    };
    return s;
};

gbs.Parser.prototype.statement = function () {
    var n = this.token;
    var v;
    if (n.std) {
        this.advance();
        this.scope.reserve(n);
        return n.std();
    }
    v = this.expression(0);
    if (v.alias !== ':=' && v.id !== '(' && v.arity !== 'routine') {
        throwParserError(v, 'Bad expression statement.');
    }
    return v;
};

gbs.Parser.prototype.statements = function () {
    var statementsList = [];
    var symbol;
    for (; ;) {
        if (this.token.id === '}' || this.token.id === '(end)') {
            break;
        }
        var range = this._currentRange();
        symbol = this.statement();
        if (symbol) {
            this._applyRangeToSymbol(range, symbol);
            statementsList.push(symbol);
        }
    }
    if (statementsList.length === 0) {
        return null;
    }
    return statementsList;
};

gbs.Parser.prototype._applyRangeToSymbol = function (range, symbol) {
    symbol.range = range;
    if (this.token.range && this.token.range.end) {
        range.end = this.token.range.end;
    }
};

gbs.Parser.prototype.rootDeclaration = function () {
    var n = this.token;
    if (!n.root) {
        this.error(n, 'Se esperaba una definición de programa, función o procedimiento.');
    }
    this.advance();
    this.scope.reserve(n);
    return n.root();
};

gbs.Parser.prototype.stmt = function (symbol, f) {
    var x = this.symbol(symbol);
    x.std = f;
    return x;
};

gbs.Parser.prototype.infix = function (id, bp, led) {
    var s = this.symbol(id, bp);
    s.led = led || function (left) {
            this.left = left;
            this.right = self.expression(bp);
            this.arity = 'binary';
            return this;
        };
    return s;
};

gbs.Parser.prototype.infixr = function (id, bp, led) {
    var s = this.symbol(id, bp);
    s.led = led || function (left) {
            this.left = left;
            this.right = g.expression(bp - 1);
            this.arity = 'binary';
            return this;
        };
    return s;
};

gbs.Parser.prototype.prefix = function (id, nud) {
    var s = this.symbol(id);
    s.nud = nud || function () {
            self.scope.reserve(this);
            this.left = self.expression(70);
            this.arity = 'unary';
            return this;
        };
    return s;
};

gbs.Parser.prototype.root = function (symbol, f) {
    var x = this.symbol(symbol);
    x.root = f;
    return x;
};

gbs.Parser.prototype.block = function () {
    var t = this.token;
    this.advance('{');
    return t.std();
};

gbs.Parser.prototype._currentRange = function () {
    return {start: this.token.range.start, end: this.token.range.end};
};

gbs.Parser.prototype.roots = function () {
    var roots = [];
    var symbol;
    for (; ;) {
        if (this.token.id === '(end)') {
            break;
        }
        var range = this._currentRange();
        symbol = this.rootDeclaration();
        if (symbol) {
            this._applyRangeToSymbol(range, symbol);
            roots.push(symbol);
        }
    }
    if (roots.length === 0) {
        return null;
    }
    return roots;
};

gbs.Parser.prototype._parseContextAwareNode = function (input, nodeParser) {
    this.tokens.input(input);
    this.newScope();
    this.advance();
    var s = nodeParser();
    this.advance('(end)');
    this.scope.pop();
    return s;
};

gbs.Parser.prototype.parseExpression = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () { return self.expression(0); });
};

gbs.Parser.prototype.parseProgram = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () { return self.roots(); });
};

gbs.Parser.prototype.parseStatements = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () { return self.statements(); });
};

/**********************************************************************************************************************/
/************************************************ GRAMMAR *************************************************************/
/**********************************************************************************************************************/

var Context = function () {
    var variablesStack = [];
    var currentVariables = {};

    this.init = function () {
    };

    this.board = function () {
    };

    this.put = function (key, value) {
        currentVariables[key] = value;
    };

    this.get = function (id) {
        return currentVariables[id];
    };

    this.all = function () {
        return currentVariables;
    };

    this.startContext = function () {
        variablesStack.push(currentVariables);
        currentVariables = {};
    };

    this.stopContext = function () {
        currentVariables = variablesStack.pop();
    };

    this.init();
};

/**********************************************************************************************************************/
/************************************************** NODES *************************************************************/
/**********************************************************************************************************************/

var STM = 'statement';
var BINARY = 'binary';
var EXPRESSION = 'binary';

gbs.node = {};

gbs.node.BinaryOperation = function (token, left, right) {
    this.token = token;
    this.left = left;
    this.right = right;
    this.arity = BINARY;
};

function defineBinaryOperation(className) {
    gbs.node[className] = function (token, left, right) {
        gbs.node.BinaryOperation.call(this, token, left, right);
    };
    gbs.node[className].prototype = new gbs.node.BinaryOperation();
}

defineBinaryOperation('SumOperation');
defineBinaryOperation('MulOperation');
defineBinaryOperation('DivOperation');
defineBinaryOperation('ModOperation');
defineBinaryOperation('DiffOperation');
defineBinaryOperation('AndOperation');
defineBinaryOperation('OrOperation');
defineBinaryOperation('NotEqualOperation');
defineBinaryOperation('EqOperation');
defineBinaryOperation('LessOperation');
defineBinaryOperation('GraterOperation');
defineBinaryOperation('LessEqualOperation');
defineBinaryOperation('GreaterEqualOperation');

gbs.node.Variable = function (node, id) {
    this.prototype = node;
    this.id = id;
};

gbs.node.NumericLiteral = function (node, value) {
    this.prototype = node;
    this.value = value;
    this.type = TOKEN_NAMES.NUMBER;
};
gbs.node.NumericLiteral.prototype.type = 'number';

gbs.node.Constant = function (node, alias, value, type) {
    this.prototype = node;
    this.value = value;
    this.alias = alias;
    this.type = type;
};

gbs.node.MoveClaw = function (node, parameters) {
    this.prototype = node;
    this.arity = STM;
    this.name = 'MoveClaw';
    this.parameters = parameters;
};

gbs.node.RemoveStone = function (node, parameters) {
    this.prototype = node;
    this.arity = STM;
    this.name = 'RemoveStone';
    this.parameters = parameters;
};

gbs.node.PutStone = function (node, parameters) {
    this.prototype = node;
    this.arity = STM;
    this.name = 'PutStone';
    this.parameters = parameters;
};

gbs.node.Boom = function (node) {
    this.prototype = node;
    this.arity = STM;
    this.name = 'BOOM';
};

gbs.node.HasStones = function (node, parameters) {
    this.prototype = node;
    this.arity = EXPRESSION;
    this.name = 'hasStones';
    this.parameters = parameters;
};

gbs.node.CanMove = function (node, parameters) {
    this.prototype = node;
    this.arity = EXPRESSION;
    this.name = 'canMove';
    this.parameters = parameters;
};

gbs.node.Assignment = function (node, left, right) {
    this.prototype = node;
    this.arity = STM;
    this.alias = ':=';
    this.left = left;
    this.right = right;
};

gbs.node.If = function (node, condition, trueBranch, falseBranch) {
    this.prototype = node;
    this.condition = condition;
    this.trueBranch = trueBranch;
    this.falseBranch = falseBranch;
};

gbs.node.Switch = function (node, expression, cases) {
    this.prototype = node;
    this.expression = expression;
    this.cases = cases;
};

gbs.node.While = function (node, expression, body) {
    this.prototype = node;
    this.expression = expression;
    this.body = body;
};

gbs.node.Repeat = function (node, expression, body) {
    this.prototype = node;
    this.expression = expression;
    this.body = body;
};

gbs.node.Program = function (node, body) {
    this.alias = 'program';
    this.prototype = node;
    this.body = body || [];
};

gbs.node.ProcedureCall = function (node, declarationProvider, parameters) {
    this.prototype = node;
    this.arity = 'routine';
    this.alias = 'ProcedureCall';
    this.name = node.value;
    this.parameters = parameters;
    this.declarationProvider = declarationProvider;
};

gbs.node.FunctionCall = function (node, declarationProvider, parameters) {
    this.prototype = node;
    this.arity = 'routine';
    this.alias = 'FunctionCall';
    this.name = node.value;
    this.parameters = parameters;
    this.declarationProvider = declarationProvider;
};

gbs.node.ProcedureDeclaration = function (node, parameters, body) {
    this.prototype = node;
    this.name = node.value;
    this.arity = 'routine';
    this.alias = 'procedureDeclaration';
    this.parameters = parameters;
    this.body = body;
};

gbs.node.FunctionDeclaration = function (node, parameters, body, returnExpression) {
    this.name = node.value;
    this.arity = 'routine';
    this.alias = 'functionDeclaration';
    this.parameters = parameters;
    this.body = body;
    this.return = returnExpression;
};

gbs.node.Root = function (program, declarations) {
    this.alias = 'root';
    this.program = program;
    this.declarations = declarations;
};

/**********************************************************************************************************************/
/************************************************ GRAMMAR *************************************************************/
/**********************************************************************************************************************/

function parameterListCall(parser) {
    var parameters = [];
    parser.advance('(');
    if (parser.token.id !== ')') {
        for (; ;) {
            log('for T: ', parser.token.id);
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

gbs.Grammar = function () {

};

var g = new gbs.Parser(new Lexer());
var define = g;
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

define.op('==', 40, gbs.node.EqOperation);
define.op('!=', 40, gbs.node.NotEqualOperation);
define.op('<', 40, gbs.node.LessOperation);
define.op('>', 40, gbs.node.GraterOperation);
define.op('<=', 40, gbs.node.LessEqualOperation);
define.op('>=', 40, gbs.node.GreaterEqualOperation);

define.constant(TOKEN_NAMES.FALSE, 'False', false, TOKEN_NAMES.BOOLEAN);
define.constant(TOKEN_NAMES.TRUE, 'True', true, TOKEN_NAMES.BOOLEAN);
define.constant(TOKEN_NAMES.BLUE, 'Blue', 0, TOKEN_NAMES.COLOR);
define.constant(TOKEN_NAMES.RED, 'Red', 1, TOKEN_NAMES.COLOR);
define.constant(TOKEN_NAMES.BLACK, 'Black', 2, TOKEN_NAMES.COLOR);
define.constant(TOKEN_NAMES.GREEN, 'Green', 3, TOKEN_NAMES.COLOR);
define.constant(TOKEN_NAMES.NORTH, 'North', [0, 1], TOKEN_NAMES.DIRECTION);
define.constant(TOKEN_NAMES.SOUTH, 'South', [0, -1], TOKEN_NAMES.DIRECTION);
define.constant(TOKEN_NAMES.EAST, 'East', [1, 0], TOKEN_NAMES.DIRECTION);
define.constant(TOKEN_NAMES.WEST, 'West', [-1, 0], TOKEN_NAMES.DIRECTION);

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
        throwParserError(left, left.value + ' no es una función o procedimiento');
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
    if (left.id !== '.' && left.id !== '[' && left.arity !== 'name') {
        g.error(left, 'Bad lvalue.');
    }
    return new gbs.node.Assignment(left, g.expression(9));
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
        throwParserError(token, 'BOOM no lleva parámetros')
    }
    return new gbs.node.Boom(token);
});

define.prefix(TOKEN_NAMES.HAS_STONES, function () {
    return new gbs.node.HasStones(g.token, parameterListCall(g));
});

define.prefix(TOKEN_NAMES.CAN_MOVE, function () {
    log('CanMove: ', g.token);
    var id = g.token;
    var parameters = parameterListCall(g);
    log('parameters: ', parameters);
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
        g.advance(n.ELSE);
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

/**********************************************************************************************************************/
/************************************************ INTERPRETER *********************************************************/
/**********************************************************************************************************************/

var InterpreterException = function (message, on) {
    this.message = message;
    this.on = on;
};
InterpreterException.prototype = new Error();

gbs.node.Constant.prototype.eval = function () {
    return this.value;
};

gbs.node.NumericLiteral.prototype.eval = function (context) {
    return this.value;
};

gbs.node.SumOperation.prototype.eval = function (context) {
    return this.left.eval(context) + this.right.eval(context)
};
gbs.node.DiffOperation.prototype.eval = function (context) {
    return this.left.eval(context) - this.right.eval(context)
};
gbs.node.MulOperation.prototype.eval = function (context) {
    return this.left.eval(context) * this.right.eval(context)
};
gbs.node.DivOperation.prototype.eval = function (context) {
    return this.left.eval(context) / this.right.eval(context)
};
gbs.node.ModOperation.prototype.eval = function (context) {
    return this.left.eval(context) % this.right.eval(context)
};
gbs.node.AndOperation.prototype.eval = function (context) {
    return this.left.eval(context) && this.right.eval(context)
};
gbs.node.OrOperation.prototype.eval = function (context) {
    return this.left.eval(context) || this.right.eval(context)
};
gbs.node.EqOperation.prototype.eval = function (context) {
    return this.left.eval(context) === this.right.eval(context)
};
gbs.node.NotEqualOperation.prototype.eval = function (context) {
    return this.left.eval(context) !== this.right.eval(context)
};
gbs.node.LessOperation.prototype.eval = function (context) {
    return this.left.eval(context) < this.right.eval(context)
};
gbs.node.GraterOperation.prototype.eval = function (context) {
    return this.left.eval(context) > this.right.eval(context)
};
gbs.node.LessEqualOperation.prototype.eval = function (context) {
    return this.left.eval(context) >= this.right.eval(context)
};
gbs.node.GreaterEqualOperation.prototype.eval = function (context) {
    return this.left.eval(context) >= this.right.eval(context)
};

gbs.node.ProcedureCall.prototype.interpret = function (context) {
    var target = this.declarationProvider();
    if (target.arity !== 'routine') {
        throw new InterpreterException('El procedimiento ' + this.name + ' no se encuentra definido.', this.node);
    }
    var parameterValues = evalParameters(context, parameters);
    context.startContext();
    fillParameters(context, parameterValues, target);
    interpretBlock(target.body, context);
    context.stopContext();
    return context;
};
