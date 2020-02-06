const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const Student = require('../models/Student');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        return response.status(401).json({
            message: 'No token provided',
            error: 'The user could not be authenticated'
        });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return response.status(401).json({
            message: 'Token error',
            error: 'The user could not be authenticated'
        });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({
            message: 'Token malformatted',
            error: 'The user could not be authenticated'
        })

    jwt.verify(token, authConfig.secret, async (error, decoded) => {
        if (error) return response.status(401).json({
            message: 'Token invalid',
            error
        });

        const student = await Student.findById(decoded.student);

        if (!student.active)
            return response.status(401).json({
                message: 'Token invalid',
                error: 'User deleted'
            })

        request.student = decoded.student;
        request.institution = decoded.institution;

        return next();
    });
}