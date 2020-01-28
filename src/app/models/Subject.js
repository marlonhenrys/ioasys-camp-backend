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
        es_schema: Course,
        es_indexed: true,
    },
    name: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

SubjectSchema.plugin(mongoosastic, elasticConnection);
SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subject', SubjectSchema);