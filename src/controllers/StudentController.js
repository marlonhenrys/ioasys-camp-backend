const Student = require('../models/Student');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

module.exports = {

    async index(request, response) {

        const { page = 1 } = request.query;
        const students = await Student.paginate({}, { page, limit: 10 });

        return response.json(students);
    },

    async show(request, response) {

        try {
            const student = await Student.findById(request.params.id);
            return response.json(student);

        } catch (error) {
            response.status(404).send({ error: 'Student not found' });
        }
    },

    async store(request, response) {

        const { email, password, ...data } = request.body;

        try {

            const oldUser = await User.findOne(email);

            if (oldUser)
                return response.status(400).send({ error: 'User already exists' });

            const student = await Student.create(data);
            const user = await User.create({ student: student.id, email, password });

            return response.json({ user, token: generateToken(user.id) });

        } catch (error) {
            response.status(400).send({ error: 'Registration failed' });
        }
    },

    async update(request, response) {

        const { password, ...data } = request.body;
        const studentId = request.params.id;

        try {
            const student = await Student.findByIdAndUpdate(studentId, data, { new: true });

            if (password)
                await User.findOneAndUpdate({ student: studentId }, password);

            return response.json(student);

        } catch (error) {
            response.status(400).send({ error: 'Update failed' });
        }
    },

    async destroy(request, response) {

        const studentId = request.params.id;

        try {
            await Student.findByIdAndUpdate(studentId, { active: false });
            await User.findOneAndDelete({ student: studentId });

            return response.status(200).send();

        } catch (error) {
            response.status(400).send({ error: 'Deletion failed' });
        }
    }
};