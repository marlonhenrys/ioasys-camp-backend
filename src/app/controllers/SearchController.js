const Student = require('../models/Student');
const Subject = require('../models/Subject');
const HelperList = require('../models/HelperList');

module.exports = {

    async findHelpers(request, response) {

        const { institution = "PUC Minas", campus = "", course = "", subject = "" } = request.query;
        console.log("Subject: ", subject);
        console.log("Course: ", course);
        Subject.search({
            bool: {
                must: [
                    {match: {'course.name': course}},
                ],
            },
        }, {hydrate: false, hydrateWithESResults: false}, (err, results) => {
            if(err){
                return response.status(400).send(err);
            }
            console.log('Result: ', results.hits.hits);
            return response.status(200).json(results.hits.hits);
        });
    },

    async findRequests(request, response) {
        // Próxima Sprint - ListaEnsinar
    }
}