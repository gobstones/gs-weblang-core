var errors = require('../utils/errors');
var Scope = require('./scope');

function throwUndefinedSymbolError() {
    throw new errors.ParserException(this, {code: 'not_defined'});
}

function throwMissingOperatorError() {
    throw new errors.ParserException(this, {code: 'missing_operator'});
}

var OriginalSymbol = function () {
    this.nud = throwUndefinedSymbolError;
    this.led = throwMissingOperatorError;
};

var Parser = function (lexer) {
    this.scope = null;
    this.token = null;
    this.tokens = lexer;
    this.symbolTable = {};
};

Parser.prototype.symbol = function (id, bindingPower) {
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

Parser.prototype.expression = function (rightBindingPower) {
    rightBindingPower = rightBindingPower || 0;
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

Parser.prototype.error = function (on, reason) {
    throw new errors.ParserException(on, reason);
};

Parser.prototype.newScope = function () {
    var s = this.scope;
    this.scope = new Scope(this);
    this.scope.parent = s;
    return this.scope;
};

Parser.prototype.advance = function (id, asBleh) {
    var a;
    var o;
    var t;
    var v;
    var tokens = this.tokens;
    if (id && this.token.id !== id) {
        if (this.lastToken && this.lastToken.range && this.token.range) {
            this.token.range.start = this.lastToken.range.start;
        }
        this.error(this.token, {code: 'expected_but_found', detail: {expected: id, actual: this.token.value}});
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
            this.error(t, {code: 'unknown_operator'});
        }
    } else if (a === 'number') {
        o = this.symbolTable['(literal)'];
        a = 'literal';
        v = parseInt(v, 10);
    } else if (asBleh) {
        o = this.symbolTable['(bleh)'];
        v = tokens.current;
    } else {
        var unmatchedToken = t.error;
        this.error(unmatchedToken, {code: 'unexpected_token', detail: {token: unmatchedToken.value}});
    }

    var token = Object.create(o);
    token.range = t.range;
    token.value = v;
    token.arity = a;
    this.lastToken = this.token;
    this.token = token;
    return token;
};

Parser.prototype.op = function (id, bp, OpDefinition) {
    var parser = this;
    var s = this.symbol(id, bp);
    s.led = function (left) {
        return new OpDefinition(this, left, parser.expression(bp));
    };
    return s;
};

Parser.prototype.statement = function () {
    var n = this.token;
    var v;
    if (n.std) {
        this.advance();
        this.scope.reserve(n);
        return n.std();
    }
    v = this.expression(0);
    if (v.alias !== ':=' && v.id !== '(' && v.arity !== 'routine') {
        this.error(v, {code: 'bad_expression_statement'});
    }
    return v;
};

Parser.prototype.statements = function () {
    var statementsList = [];
    var symbol;
    for (; ;) {
        if (this.token.id === '}' || this.token.id === '(end)') {
            break;
        }
        var range = this._currentRange();
        symbol = this.statement();
        if (symbol && !symbol.separator) {
            this._applyRangeToSymbol(range, symbol);
            statementsList.push(symbol);
        }
    }
    if (statementsList.length === 0) {
        return null;
    }
    return statementsList;
};

Parser.prototype._applyRangeToSymbol = function (range, symbol) {
    symbol.range = range;
    if (this.token.range && this.token.range.end) {
        range.end = this.token.range.end;
    }
};

Parser.prototype.rootDeclaration = function () {
    var n = this.token;
    if (!n.root) {
        this.error(n, {code: 'no_root_declaration'});
    }
    this.advance();
    this.scope.reserve(n);
    return n.root();
};

Parser.prototype.stmt = function (symbol, f) {
    var x = this.symbol(symbol);
    x.std = f;
    return x;
};

Parser.prototype.infix = function (id, bp, led) {
    var s = this.symbol(id, bp);
    var self = this;
    s.led = led || function (left) {
        this.left = left;
        this.right = self.expression(bp);
        this.arity = 'binary';
        return this;
    };
    return s;
};

Parser.prototype.infixr = function (id, bp, led) {
    var s = this.symbol(id, bp);
    var self = this;
    s.led = led || function (left) {
        this.left = left;
        this.right = self.expression(bp - 1);
        this.arity = 'binary';
        return this;
    };
    return s;
};

Parser.prototype.prefix = function (id, nud) {
    var s = this.symbol(id);
    var self = this;
    s.nud = nud || function () {
        self.scope.reserve(this);
        this.left = self.expression(70);
        this.arity = 'unary';
        return this;
    };
    return s;
};

Parser.prototype.root = function (symbol, f) {
    var x = this.symbol(symbol);
    x.root = f;
    return x;
};

Parser.prototype.block = function () {
    var t = this.token;
    this.advance('{');
    return t.std();
};

Parser.prototype._currentRange = function () {
    return {start: this.token.range.start, end: this.token.range.end};
};

Parser.prototype.roots = function () {
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

Parser.prototype._parseContextAwareNode = function (input, nodeParser) {
    this.tokens.input(input);
    this.newScope();
    this.advance();
    var s = nodeParser();
    this.advance('(end)');
    this.scope.pop();
    return s;
};

Parser.prototype.parseExpression = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () {
        return self.expression(0);
    });
};

Parser.prototype.parseProgram = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () {
        return self.roots();
    });
};

Parser.prototype.parseStatements = function (input) {
    var self = this;
    return this._parseContextAwareNode(input, function () {
        return self.statements();
    });
};

module.exports = Parser;
