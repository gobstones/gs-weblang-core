module.exports = {
    splitByLines: function (string) {
        return string.split(/\r\n|\r|\n/);
    },

    scan: function (string, regExp) {
        if (!regExp.global) {
            throw new Error('The regExp must be global (with "g" flag)');
        }
        var m = [];
        var r = m;
        m = regExp.exec(string);
        while (m) {
            m.shift();
            r.push(m);
            m = regExp.exec(string);
        }
        return r;
    }
};
