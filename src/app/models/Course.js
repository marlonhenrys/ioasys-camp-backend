const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    campus: {
        type: String,
        required: true,
    }
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', CourseSchema);