const regex = require('xregexp');

module.exports = (s) => {
    const first = regex.replace(s, regex('[^\\p{L}\\p{Nd}\\s]', 'igu'), '');
    return regex.replace(first, regex('\\s+', 'igu'), ' ');
}