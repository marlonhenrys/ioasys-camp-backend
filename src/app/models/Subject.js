const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SubjectSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subject', SubjectSchema);