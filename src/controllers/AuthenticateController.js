const User = require('../models/User');
const crypto = require('crypto-js');

module.exports = {

    async index(request, response) {
        let { email, password } = request.body;

        const user = await User.findOne({ email });

        if (user && user.password == crypto.SHA256(password))
            return response.json(user);
        else
            return response.send();
    }
}