var _ = require('lodash');

var ARROW_KEYS = ['ARROW_LEFT', 'ARROW_RIGHT', 'ARROW_UP', 'ARROW_DOWN'];
var SPECIAL_KEYS = ['SPACE', 'ENTER', 'TAB', 'BACKSPACE', 'DELETE', 'ESCAPE'];
var SYMBOL_KEYS = ['PLUS', 'MINUS', 'ASTERISK', 'SLASH', 'EQUALS', 'L_PARENT', 'R_PARENT', 'L_BRACKET', 'R_BRACKET', 'L_ANGLEBR', 'R_ANGLEBR'].concat(ARROW_KEYS);
var MODIFIERS = ['CTRL_ALT_SHIFT_', 'ALT_SHIFT_', 'CTRL_ALT_', 'CTRL_SHIFT_', 'CTRL_', 'ALT_', 'SHIFT_'];

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
    var modifierWithKey = keyDef.substring(2);

    var modifier = _.find(MODIFIERS, function (it) {
        return _.startsWith(modifierWithKey, it);
    });

    var key = modifierWithKey.replace(modifier, '');

    return _.startsWith(keyDef, 'K_') && isValidKey(key);
};
