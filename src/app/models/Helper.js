const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');
const Subject = require('./Subject');
const Course = require('./Course');

const elasticConnection = require('../../config/elasticConnection.json');

const HelperSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    }]
});

elasticConnection['populate'] = [
    { path: 'subjects', model: Subject, select: 'name' },
    {
        path: 'student', model: Student,
        populate: [
            { path: 'course', model: Course },
        ]
    },
]

HelperSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('Helper', HelperSchema);
Model.synchronize({}, { saveOnSynchronize: true });

module.exports = Model;