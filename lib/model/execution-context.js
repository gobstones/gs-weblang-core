var _ = require('lodash');
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

    this.put = function (key, value) {
        currentVariables[key] = value;
    };

    this.get = function (id) {
        return currentVariables[id];
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

    this.getCurrentName = function () {
        return _.last(namesStack);
    };

    this.init();
};

module.exports = Context;
