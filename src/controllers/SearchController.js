const Student = require('../models/Student');

module.exports = {

    async index(request, response) {

        const students = await Student.find({

        });

        return response.json(students);
    }
}