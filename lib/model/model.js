var errors = require('../utils/errors');
var viewAdapter = require('./view-adapter');

function Board(sizeX, sizeY) {
    this.x = 0;
    this.y = 0;

    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.snapshots = [];
}

Board.blue = 0;
Board.red = 1;
Board.black = 2;
Board.green = 3;

Board.north = [0, 1];
Board.east = [1, 0];
Board.south = [0, -1];
Board.west = [-1, 0];

Board.minDir = Board.north;
Board.maxDir = Board.west;
Board.minColor = Board.blue;
Board.maxColor = Board.green;

Board.prototype.init = function () {
    this.table = [[], [], [], []];
    for (var i = 0; i < this.sizeX; i++) {
        this.table[0][i] = [];
        this.table[1][i] = [];
        this.table[2][i] = [];
        this.table[3][i] = [];
        for (var j = 0; j < this.sizeY; j++) {
            this.table[0][i][j] = 0;
            this.table[1][i][j] = 0;
            this.table[2][i][j] = 0;
            this.table[3][i][j] = 0;
        }
    }
};

Board.prototype.clone = function () {
    var c = new Board(this.sizeX, this.sizeY);
    c.init();
    for (var i = 0; i < this.sizeX; i++) {
        c.table[0][i] = [];
        c.table[1][i] = [];
        c.table[2][i] = [];
        c.table[3][i] = [];
        for (var j = 0; j < this.sizeY; j++) {
            c.table[0][i][j] = this.table[0][i][j];
            c.table[1][i][j] = this.table[1][i][j];
            c.table[2][i][j] = this.table[2][i][j];
            c.table[3][i][j] = this.table[3][i][j];
        }
    }
    c.x = this.x;
    c.y = this.y;
    return c;
};

Board.prototype.dropStones = function (color, amount) {
    this.table[color][this.x][this.y] += amount;
};

// ---ACTIONS---

Board.prototype.putStone = function (color, snapshot) {
    this.saveSnapshot(snapshot);
    this.dropStones(color, 1);
};

Board.prototype.removeStone = function (color, snapshot) {
    this.saveSnapshot(snapshot);
    if (this.table[color][this.x][this.y] <= 0) {
        throw new errors.GobstonesError({code: 'no_stones'});
    }
    this.table[color][this.x][this.y] -= 1;
};

Board.prototype.clear = function (snapshot) {
    this.saveSnapshot(snapshot);
    this.init();
};

Board.prototype.move = function (vec, snapshot) {
    this.saveSnapshot(snapshot);
    if (!this.canMove(vec)) {
        throw new errors.GobstonesError({code: 'out_of_board', detail: {x: this.x, y: this.y}});
    }
    this.x += vec[0];
    this.y += vec[1];
};

Board.prototype.moveToEdge = function (vec, snapshot) {
    this.saveSnapshot(snapshot);
    if (vec[0] === 1) {
        this.x = this.sizeX - 1;
    } else if (vec[0] === -1) {
        this.x = 0;
    } else if (vec[1] === 1) {
        this.y = this.sizeY - 1;
    } else if (vec[1] === -1) {
        this.y = 0;
    }
};

// -------------

Board.prototype.boom = function (message, snapshot) {
    this.saveSnapshot(snapshot);
    throw new errors.GobstonesError({code: 'boom_called', detail: {message: message}});
};

Board.prototype.amountStones = function (color) {
    return this.table[color][this.x][this.y];
};

Board.prototype.canMove = function (vec) {
    var nextX = this.x + vec[0];
    var nextY = this.y + vec[1];
    return nextX < this.sizeX && nextX >= 0 && nextY < this.sizeY && nextY >= 0;
};

Board.prototype.printAscii = function () {
    var out = this.sizeX + 'x' + this.sizeY + '\n';
    var az = this.table[0];
    var ro = this.table[1];
    var ne = this.table[2];
    var ve = this.table[3];
    for (var j = this.sizeY - 1; j >= 0; j--) {
        for (var i = 0; i < this.sizeX; i++) {
            out += (az[i][j] || ro[i][j] || ne[i][j] || ve[i][j]) ? '#' : '.';
        }
        out += '\n';
    }
    return out;
};

Board.prototype.toView = function () {
    return viewAdapter.toView(this.table);
};

Board.prototype.fromView = function (table) {
    this.table = viewAdapter.toModel(table);
    return this;
};

Board.prototype.saveSnapshot = function (snapshot) {
    snapshot.board = this.clone();
    this.snapshots.push(snapshot);
};

module.exports = Board;
