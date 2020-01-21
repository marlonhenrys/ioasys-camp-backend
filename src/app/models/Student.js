const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.ObjectId,
    },
    gender: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);