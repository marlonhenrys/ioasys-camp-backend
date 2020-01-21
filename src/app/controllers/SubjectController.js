const Subject = require('../models/Subject')

module.exports = {
    async index(request, response) {
        try {
            const { page = 1, limit = 10 } = request.query;

            const subjects = await Subject.paginate({}, { page, limit });

            return response.status(200).json(subjects);
        } catch (error) {
            return response.status(400).json(error);
        }
    },
}