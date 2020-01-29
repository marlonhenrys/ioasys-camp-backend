const Student = require('../models/Student');
const HelperList = require('../models/HelperList');

module.exports = {

    async findHelpers(request, response) {

        const { institution = "PUC Minas", campus = "", course = "", subject = "" } = request;

        HelperList.search({
            match_all: {}
        }, {hydrate: true, hydrateWithESResults: true}, (err, results) => {
            if(err){
                return response.status(400).send(err);
            }
            return response.status(200).json(results.hits);
        });
    },

    async findRequests(request, response) {
        // Próxima Sprint - ListaEnsinar
    }
}