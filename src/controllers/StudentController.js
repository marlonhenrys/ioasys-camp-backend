const Student = require('../models/Student');
const createUser = require('./utils/CreateUser');

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
        const { name, email, password } = request.body;

        const student = await Student.create({
            name,
        });

        const user = await createUser(student.id, email, password);

        return response.json(user);
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