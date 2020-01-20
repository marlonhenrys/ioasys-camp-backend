const User = require('../models/User');
const crypto = require('crypto-js');
const generateToken = require('../utils/generateToken');

module.exports = {

    async index(request, response) {

        let { email, password } = request.body;

        const user = await User.findOne(email);

        if (!user)
            return response.status(404).send({ error: 'User not found' });

        if (user.password !== crypto.SHA256(password))
            return response.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        return response.json({ user, token: generateToken(user.id) });
    }
}