const Student = require('../models/Student');
const Subject = require('../models/Subject');
const HelperList = require('../models/HelperList');

module.exports = {

    async findHelpers(request, response) {
        const { institution = "", course = "", campus = "", subject = "" } = request.query;
        HelperList.search({
            bool: {
                must: [
                    {match: {'subject.name': subject}},
                ],
                should: [
                    {match: {'course.name': course}},
                    {match: {'course.campus': campus}},
                    {match: {'course.institution.name': institution}},
                ],
            },
        }, {hydrate: false, hydrateWithESResults: false}, (err, results) => {
            if(err){
                return response.sendStatus(400);
            }
            return response.status(200).json(results.hits.hits);
        });
    },

    async findRequests(request, response) {
        // Próxima Sprint - ListaEnsinar
    }
}