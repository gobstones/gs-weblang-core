var _ = require('lodash');
var wrap = require('../nodes/helpers/wrap');
var Board = require('./model');

var randomId = function () {
    return Math.floor((1 + Math.random()) * 0x10000);
};

var Context = function () {
    var variablesStack = [];
    var boardsStack = [];
    var namesStack = ['program'];
    var currentBoard = new Board(9, 9);
    var currentVariables = {};

    this.init = function () {
        currentBoard.init();
    };

    this.nativeRepresentations = function () {
        return Board;
    };

    this.board = function () {
        return currentBoard;
    };

    this.put = function (key, value, node, token) {
        var existingVariable = this.getNode(key);
        var type = wrap(value).type;
        if (existingVariable !== undefined && existingVariable.type !== undefined && type !== undefined && existingVariable.type !== type) {
            throw new node.errors.InterpreterException('No se puede asignar a "' + key + '" un valor de tipo "' + type + '" ya que es de tipo "' + existingVariable.type + '".', token, {code: 'inconsistent_assignment', detail: {name: key, expected: existingVariable.type, actual: type}});
        }
        currentVariables[key] = value;
    };

    this.get = function (id) {
        return this.getNode(id).value;
    };

    this.getNode = function (id) {
        return wrap(currentVariables[id]);
    };

    this.all = function () {
        return currentVariables;
    };

    this.startContext = function (name) {
        namesStack.push(name + '-' + randomId());
        variablesStack.push(currentVariables);
        currentVariables = {};
    };

    this.stopContext = function () {
        namesStack.pop();
        currentVariables = variablesStack.pop();
    };

    this.pushBoard = function () {
        boardsStack.push(currentBoard);
        currentBoard = currentBoard.clone();
    };

    this.popBoard = function () {
        currentBoard = boardsStack.pop();
    };

    this.getCurrentNames = function () {
        return _.clone(namesStack);
    };

    this.init();
};

module.exports = Context;
