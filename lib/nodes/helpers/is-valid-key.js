var _ = require('lodash');

var ARROW_KEYS = ['ARROW_LEFT', 'ARROW_RIGHT', 'ARROW_UP', 'ARROW_DOWN'];
var SPECIAL_KEYS = ['SPACE', 'ENTER', 'TAB', 'BACKSPACE', 'DELETE', 'ESCAPE'];
var SYMBOL_KEYS = ['PLUS', 'MINUS', 'ASTERISK', 'SLASH', 'EQUALS', 'L_PARENT', 'R_PARENT', 'L_BRACKET', 'R_BRACKET', 'L_ANGLEBR', 'R_ANGLEBR'].concat(ARROW_KEYS);
var MODIFIERS = ['', 'CTRL', 'ALT', 'SHIFT', 'CTRL_ALT', 'CTRL_SHIFT', 'ALT_SHIFT', 'CTRL_ALT_SHIFT'];

var isUpperChar = function (char) {
    return /^[A-ZÑÁÉÍÓÚ]$/.test(char);
};

var isDigit = function (char) {
    return /^[0-9]$/.test(char);
};

var isValidKey = function (key) {
    return isUpperChar(key) || isDigit(key) || _.includes(SYMBOL_KEYS, key) || _.includes(SPECIAL_KEYS, key);
};

module.exports = function (keyDef) {
    var parts = keyDef.split('_');
    var prefix = parts[0];
    var modifier = parts.slice(1, -1).join('_');
    var key = parts[parts.length - 1];

    return prefix === 'K' && _.includes(MODIFIERS, modifier) && isValidKey(key);
};
