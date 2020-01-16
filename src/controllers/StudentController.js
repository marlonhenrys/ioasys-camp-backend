const Student = require('../models/Student');

module.exports = {

    async index(request, response) {
        const students = await Student.find();

        return response.json(students);
    },

    async show(request, response) {

    },

    async store(request, response) {
        // const { name, } = request.body;

        const student = await Student.create({
            // name,
        });

        return response.json(student);
    },

    async update(request, response) {

    },

    async destroy(request, response) {

    }
};