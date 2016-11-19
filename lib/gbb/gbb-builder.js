var gbbWriter = {
};

gbbWriter.build = function (board) {
    var self = this;
    var view = board.toView();

    var r = '';
    r = this._add(r, 'GBB/1.0');
    r = this._add(r, this._join(['size', board.sizeX, board.sizeY]));
    view.forEach(function (row, y) {
        row.forEach(function (cell, x) {
            var colors = this._join([
                'Azul', cell.blue,
                'Negro', cell.black,
                'Rojo', cell.red,
                'Verde', cell.green
            ]);
            r = self._add(r, this._join(['cell', x, y, colors]));
        });
    });
    r = this._add(r, this._join(['head', board.x, board.y]));

    return r;
};

gbbWriter._add = function (result, line) {
    return result + line + '\r\n';
};

gbbWriter._join = function (words) {
    return words.join(' ');
};

module.exports = gbbWriter;
