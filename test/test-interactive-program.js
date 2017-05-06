var utils = require('./_utils');

utils.testProgram('interactive/basic-interactive.gbs', function (t, interactiveProgram) {
    var context = interactiveProgram.context;

    t.throws(function () {
        context.get('a');
    });
    var newContext = interactiveProgram.onKey('TECLA_CUALQUIERA');
    t.is(newContext, context);
    t.is(context.get('a'), 33);
});
