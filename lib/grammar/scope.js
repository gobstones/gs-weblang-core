var errors = require('../utils/errors');

function itself() {
    return this;
}

var Scope = function (parser) {
    this.parser = parser;
    this.def = {};
};

Scope.prototype.define = function (name) {
    var t = this.def[name.value];
    if (typeof t === 'object') {
        errors.throwParserError(name, t.reserved ? 'Already reserved.' : 'Already defined.');
    }
    this.def[name.value] = name;
    name.reserved = false;
    name.nud = itself;
    name.led = null;
    name.std = null;
    name.lbp = 0;
    name.scope = this.parser.scope;
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
