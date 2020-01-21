const Student = require('../models/Student');
const User = require('../models/User');

module.exports = {

    async index(request, response) {

        const { page = 1 } = request.query;
        const students = await Student.paginate({ active: true }, { page, limit: 10 });

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

    async update(request, response) {

        const { password, ...data } = request.body;
        const { studentId } = request;

        try {
            const student = await Student.findByIdAndUpdate(studentId, data, { new: true });

            if (password) {
                const user = await User.findOne({ student: studentId });
                user.password = password;
                user.save();
            }

            return response.json(student);

        } catch (error) {
            response.status(400).send({ error: 'Update failed' });
        }
    },

    async destroy(request, response) {

        const { studentId } = request;

        try {
            await Student.findByIdAndUpdate(studentId, { active: false });
            await User.findOneAndDelete({ student: studentId });

            return response.status(200).send();

        } catch (error) {
            response.status(400).send({ error: 'Deletion failed' });
        }
    }
};