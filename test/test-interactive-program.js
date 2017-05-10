var utils = require('./_utils');

utils.testProgram('interactive/basic-interactive.gbs', function (t, interactiveProgram) {
    var context = interactiveProgram.context;

    t.throws(function () {
        context.get('a');
    });
    var newContext = interactiveProgram.onKey('K_SHIFT_D');
    t.is(newContext, context);
    t.is(context.get('a'), 33);
});

utils.testProgram('interactive/many-keys.gbs', function (t, interactiveProgram) {
    t.deepEqual(interactiveProgram.keys, ['K_H', 'K_SHIFT_D', 'K_SHIFT_ARROW_DOWN', 'K_CTRL_ALT_SHIFT_L_BRACKET', 'K_ENTER']);
});
