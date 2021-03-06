var _ = require('lodash');

var language = 'es';

var translations = {
    es: require('./es')
};

module.exports = {
    setLanguage: function(val) {
        if (translations[val]) {
            language = val;
        } else {
            throw new Error(_.template('Language <%=name%> is not supported yet.')({ name: val }));
        }
    },

    get: function(key, parameters) {
        var locale = this.getLocales()[key];
        return _.isFunction(locale) ? locale(parameters) : _.template(locale)(parameters);
    },

    getLocales: function() {
        return translations[language];
    }
};
