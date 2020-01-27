const Student = require('../models/Student');

module.exports = {

    async findHelpers(request, response) {

        const {} = request.query;

        try {
            const helpers = await Student.find({

            });

            return response.status(200).json(helpers);

        } catch (error) {

        }
    },

    async findRequests(request, response) {

        // Próxima Sprint - ListaEnsinar
    }
}