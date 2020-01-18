const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    course: {
        type: mongoose.ObjectId,
        required: true,
    },
    turn: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Subject', SubjectSchema);