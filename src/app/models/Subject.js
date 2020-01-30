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
    }
});

elasticConnection['populate'] = [
    {path: 'course', select: 'name'}
]

SubjectSchema.plugin(mongoosastic, elasticConnection);
SubjectSchema.plugin(mongoosePaginate);

console.log("Elastic: ", elasticConnection);

const Model = mongoose.model('Subject', SubjectSchema);
let stream = Model.synchronize({}, {saveOnSynchronize: true});

let count = 0;

stream.on('data', () => {
    count++;
});
stream.on('close', () => {
    console.log("Indexed subjects: " + count);
});
stream.on('error', (err) => {
    console.log("ESIndex Subject Error: " + err);
});

module.exports = Model;