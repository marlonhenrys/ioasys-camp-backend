const User = require('../../models/User');
const crypto = require('crypto-js');

module.exports = async (student, email, password) => {
    
    const user = await User.create({
        student,
        email,
        password: crypto.SHA256(password),
    })

    return user;
}