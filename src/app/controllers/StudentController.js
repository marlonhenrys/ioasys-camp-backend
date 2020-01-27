const Student = require('../models/Student');
const User = require('../models/User');

module.exports = {

    async index(request, response) {

        const { page = 1, limit = 10 } = request.query;
        const students = await Student.paginate({ active: true }, { page, limit });

        return response.status(200).json(students);
    },

    async show(request, response) {

        const { id } = request.params;

        try {
            const student = await Student.findById(id).populate('course');
            return response.status(200).json(student);

        } catch (error) {
            return response.status(404).json({
                message: 'Student not found',
                error
            });
        }
    },

    async update(request, response) {

        const { password, ...data } = request.body;
        const { student } = request;

        try {
            const newStudent = await Student.findByIdAndUpdate(student, data, { new: true });

            if (password) {
                const user = await User.findOne({ student });
                user.password = password;
                await user.save();
            }

            return response.status(200).json(newStudent);

        } catch (error) {
            return response.status(400).json({
                message: 'Update failed',
                error
            });
        }
    },

    async destroy(request, response) {

        const { student } = request;

        try {
            await Student.findByIdAndUpdate(student, { active: false });
            await User.findOneAndDelete({ student });

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
};