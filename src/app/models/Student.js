const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
});

StudentSchema.plugin(mongoosastic, {
    
});
StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);