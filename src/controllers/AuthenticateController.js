const User = require('../models/User');

module.exports = {

    async index(request, response) {
        const { email, senha } = request.body;

        const user = await User.findOne({

        });

        return response.json(user);
    }
}