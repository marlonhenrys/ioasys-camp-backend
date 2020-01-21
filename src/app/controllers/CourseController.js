const Course = require('../models/Course');

module.exports = {
    async index(request, response) {
        try {
            const { page = 1, limit = 10 } = request.query;

            const courses = await Course.paginate({}, { page, limit });

            return response.status(200).json(courses);
        } catch (error) {
            return response.status(400).json(error);
        }
    },
}