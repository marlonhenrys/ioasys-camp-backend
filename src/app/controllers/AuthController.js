const User = require('../models/User');
const Student = require('../models/Student');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

function generateToken(studentId) {
    return jwt.sign({ id: studentId }, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {

    async register(request, response) {

        const { email, password, ...data } = request.body;

        try {

            const oldUser = await User.findOne({ email });

            if (oldUser)
                return response.status(400).send({ error: 'User already exists' });

            const student = await Student.create(data);
            const user = await User.create({ student: student.id, email, password });

            return response.json({ user, token: generateToken(user.student) });

        } catch (error) {
            console.log(error);
            response.status(400).send({ error: 'Registration failed' });
        }
    },

    async login(request, response) {

        let { email, password } = request.body;

        const user = await User.findOne({ email });

        if (!user)
            return response.status(404).send({ error: 'User not found' });

        if (user.password != crypto.SHA256(password))
            return response.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        return response.json({ user, token: generateToken(user.student) });
    }
}