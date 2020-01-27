const Subject = require('../models/Subject')

module.exports = {

    async index(request, response) {

        const { page = 1, limit = 10 } = request.query;
        const subjects = await Subject.paginate({}, { page, limit });

        return response.status(200).json(subjects);
    },

    async show(request, response) {

        const { id } = request.params;

        try {
            const subject = await Subject.findById(id);
            return response.status(200).json(subject);

        } catch (error) {
            return response.status(404).json({
                message: 'Subject not found',
                error
            });
        }
    }
}