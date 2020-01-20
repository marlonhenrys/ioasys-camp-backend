const User = require('../../models/User');

module.exports = {

    async exists(email) {

        const user = await User.findOne(email);

        return user;
    },

    async create(student, email, password) {

        const user = await User.create({
            student,
            email,
            password,
        });

        return user;
    },

    async update(student, password) {

        const user = await User.findOneAndUpdate(student, password);

        return user;
    },

    async destroy(student) {
        await User.findOneAndDelete(student);
    }
};