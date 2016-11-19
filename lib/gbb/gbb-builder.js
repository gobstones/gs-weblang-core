var gbbWriter = {
};

gbbWriter.build = function (board) {
    var self = this;
    var view = board.toView();

    var r = '';
    r = this._add(r, 'GBB/1.0');
    r = this._add(r, this._join(['size', board.sizeX, board.sizeY]));
    view.forEach(function (row, rowIndex) {
        var y = board.sizeY - 1 - rowIndex;

        row.forEach(function (cell, x) {
            if (cell.blue === 0 && cell.black === 0 && cell.red === 0 && cell.green === 0) {
                return;
            }

            var colors = self._join([
                'Azul', cell.blue,
                'Negro', cell.black,
                'Rojo', cell.red,
                'Verde', cell.green
            ]);
            r = self._add(r, self._join(['cell', x, y, colors]));
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
