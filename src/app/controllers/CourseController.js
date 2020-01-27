const Course = require('../models/Course');

module.exports = {

    async index(request, response) {

        const { page = 1, limit = 10 } = request.query;
        const courses = await Course.paginate({}, { page, limit });

        return response.status(200).json(courses);
    },

    async show(request, response) {

        const { id } = request.params;

        try {
            const course = await Course.findById(id);
            return response.status(200).json(course);

        } catch (error) {
            return response.status(404).json({
                message: 'Course not found',
                error
            });
        }
    }
}