const Macros = require('./macros');

module.exports = (size) => {
    if (isNaN(Number(size))) {
        return Macros.DEFAULT_MAX_HITS;
    } else {
        if (size > Macros.MAX_HITS) {
            return Macros.MAX_HITS;
        } else if (size < 1) {
            return Macros.DEFAULT_MAX_HITS;
        } else {
            return size;
        }
    }
}