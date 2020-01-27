const User = require('../models/User');
const Student = require('../models/Student');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

function generateToken(student, institution) {
    return jwt.sign({ student, institution }, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {

    async register(request, response) {

        const { email, password, ...data } = request.body;

        try {
            const oldUser = await User.findOne({ email });

            if (oldUser)
                return response.status(400).json({
                    message: 'User already exists',
                    error: 'Registration failed'
                });

            const student = await Student.create(data);
            const user = await User.create({
                student: student.id,
                email,
                password
            });

            return response.status(201).json({
                user,
                token: generateToken(user.student, student.institution)
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Registration failed',
                error
            });
        }
    },

    async login(request, response) {

        let { email, password } = request.body;

        const user = await User.findOne({ email }).populate('student');

        if (!user)
            return response.status(401).json({
                message: 'User not found',
                error: 'The user could not be authenticated'
            });

        if (user.password != crypto.SHA256(password))
            return response.status(401).json({
                message: 'Invalid password',
                error: 'The user could not be authenticated'
            });

        user.password = undefined;

        return response.status(200).json({
            user,
            token: generateToken(user.student._id, user.student.institution)
        });
    }
}