var test = require('ava');
var viewAdapter = require('../lib/model/view-adapter');

var c = function (blue, red, black, green) {
    return {blue: blue, red: red, black: black, green: green};
};

var model = function () {
    return [
      [[0, 3], [0, 0]], // blue  - columns - rows
      [[0, 0], [0, 4]], // red   - columns - rows
      [[1, 0], [0, 0]], // black - columns - rows
      [[0, 0], [5, 0]] //  green - columns - rows
    ];
};

var view = function () {
    return [
      [c(3, 0, 0, 0), c(0, 4, 0, 0)], // 2nd row - columns - colors
      [c(0, 0, 1, 0), c(0, 0, 0, 5)]  // 1st row - columns - colors
    ];
};

test('Can adapt to the view', function (t) {
    t.deepEqual(viewAdapter.toView(model()), view());
});

test('Can adapt to the model', function (t) {
    t.deepEqual(viewAdapter.toModel(view()), model());
});
