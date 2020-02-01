const Subject = require('../models/Subject')

module.exports = {

    async index(request, response) {

        //const { page = 1, limit = 10 } = request.query;
        //const subjects = await Subject.paginate({}, { page, limit });

        //return response.status(200).json(subjects);

        const { course, subject = "" } = request.query;
        Subject.search({
            bool: {
                must: [
                    {match: {'course._id': course}},
                    {match: {'name': subject}},
                ],
            },
        }, {hydrate: false, hydrateWithESResults: false}, (err, results) => {
            if(err){
                return response.sendStatus(400);
            }
            return response.status(200).json(results.hits.hits);
        });
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