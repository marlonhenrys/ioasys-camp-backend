const Student = require('../models/Student');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const students = await Student.paginate({}, { page, limit: 10 });

        return response.json(students);
    },

    async show(request, response) {
        const student = await Student.findById(request.params.id);

        return response.json(student);
    },

    async store(request, response) {
        // const { name, } = request.body;

        const student = await Student.create({
            // name,
        });

        return response.json(student);
    },

    async update(request, response) {
        const student = await Student.findByIdAndUpdate(request.params.id, request.body, { new: true });

        return response.json(student);
    },

    async destroy(request, response) {
        await Student.findByIdAndDelete(request.params.id);

        return response.send();
    }
};