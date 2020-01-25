const HelperList = require('../models/HelperList');

module.exports = {

    async index(request, response) {

        const { studentId } = request;

        const helperList = await HelperList.find({ helper: studentId });

        return response.status(200).json(helperList);
    },

    async show(request, response) {

        const { helper } = request.params;

        const helperList = await HelperList.find({ helper });

        return response.status(200).json(helperList);
    },

    async store(request, response) {

        const { subjects } = request.body;
        const { studentId } = request;

        try {
            const helperList = await HelperList.find({ helper: studentId });

            subjects.map(subject => {
                if (!helperList.subjects.includes(subject))
                    helperList.subjects.push(subject);
            });

            await helperList.save();

            return response.status(200).json(helperList);

        } catch (error) {
            return response.status(400).json({
                message: 'Failed to save',
                error
            });
        }
    },

    async destroy(request, response) {

        const { id } = request.params;
        const { studentId } = request;

        try {
            const helperList = await HelperList.find({ helper: studentId });

            const newList = helperList.subjects.filter(subject => subject != id);

            helperList.subjects = newList;

            await helperList.save();

            return response.status(200).json({
                message: 'Successful deletion'
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Deletion failed',
                error
            });
        }
    }
}