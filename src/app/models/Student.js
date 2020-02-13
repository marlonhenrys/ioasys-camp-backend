const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const Course = require('./Course');

const elasticConnection = require('../../config/elasticConnection.json');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
        es_type: 'search_as_you_type',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    isHelper: {
        type: Boolean,
        required: true,
    }
});

elasticConnection['populate'] = [
    { path: 'course' },
]

StudentSchema.plugin(mongoosastic, elasticConnection);
StudentSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Student', StudentSchema);
Model.synchronize({}, { saveOnSynchronize: true });

module.exports = Model;