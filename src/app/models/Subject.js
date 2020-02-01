const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const Course = require('./Course');

const elasticConnection = require('../../config/elasticConnection.json');

const SubjectSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    name: {
        type: String,
        required: true,
        es_indexed: true,
        es_type: 'search_as_you_type',
    }
});

elasticConnection['populate'] = [
    {path: 'course', select: 'name'}
]

SubjectSchema.plugin(mongoosastic, elasticConnection);
SubjectSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Subject', SubjectSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;