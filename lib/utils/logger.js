var doNothing = function () {
};

module.exports = (console && console.log) ? console.log : doNothing;
