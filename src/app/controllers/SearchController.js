const Student = require('../models/Student');
const HelperList = require('../models/HelperList');

module.exports = {

    async findHelpers(request, response) {

        const { institution } = request;

        try {
            const helpers = await HelperList.find({

            });

            return response.status(200).json(helpers);

        } catch (error) {

        }
    },

    async findRequests(request, response) {
        // Próxima Sprint - ListaEnsinar
    }
}