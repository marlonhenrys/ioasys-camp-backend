const Subject = require('../models/Subject')

module.exports = {

    async index(request, response) {

        const { page = 1, limit = 10 } = request.query;
        const subjects = await Subject.paginate({}, { page, limit });

        return response.json(subjects);
    },
}