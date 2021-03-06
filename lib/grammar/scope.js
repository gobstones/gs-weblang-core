var errors = require('../utils/errors');

function itself() {
    return this;
}

var Scope = function (parser) {
    this.parser = parser;
    this.def = {};
};

Scope.prototype.define = function (identifier) {
    var t = this.find(identifier.value);

    if (typeof t === 'object' && t.arity === 'name') {
        var name = t.declaration.alias === 'procedureDeclaration' ? 'procedure' : 'function';
        // TODO: Esto no está andando bien
        var errorCode = t.reserved ? 'reserved_name' : 'existing_' + name;
        throw new errors.ParserException(identifier, {code: errorCode, detail: {name: identifier.value}});
    }

    this.def[identifier.value] = identifier;
    identifier.reserved = false;
    identifier.nud = itself;
    identifier.led = null;
    identifier.std = null;
    identifier.lbp = 0;
    identifier.scope = this.parser.scope;
    return identifier;
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
            return targetToken && typeof targetToken !== 'function' ? targetToken : this.parser.symbolTable['(name)'];
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

module.exports = Scope;
