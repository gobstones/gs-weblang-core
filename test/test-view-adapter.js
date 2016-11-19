var test = require('ava');
var Model = require('../lib/model/model');
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

test('Can adapt to the view from the model', function (t) {
    var aModel = new Model(4, 2);
    aModel.table = viewAdapter.toModel(view());

    t.deepEqual(aModel.toView(), view());
});

test('Can initialize the model from the view', function (t) {
    var aModel = new Model(4, 2);
    aModel.fromView(view());

    t.deepEqual(aModel.table, model());
});
