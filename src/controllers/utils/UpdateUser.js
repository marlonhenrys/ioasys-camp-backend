const User = require('../../models/User');
const crypto = require('crypto-js');

module.exports = async (student, newPassword) => {

    const user = await User.findOneAndUpdate(student, {
        password: crypto.SHA256(newPassword),
    });

    return user;
}