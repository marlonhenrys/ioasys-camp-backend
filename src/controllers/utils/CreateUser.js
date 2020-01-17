const User = require('../../models/User');
const crypto = require('crypto-js');

module.exports = async (student_id, email, password) => {
    
    const user = await User.create({
        student_id,
        email,
        password: crypto.SHA256(password),
    })

    return user;
}