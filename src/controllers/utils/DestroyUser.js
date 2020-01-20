const User = require('../../models/User');

module.exports = async (student) => {
    await User.findOneAndDelete(student);
}