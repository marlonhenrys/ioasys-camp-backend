const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const Institution = require('./Institution');

const elasticConnection = require('../../config/elasticConnection.json');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
        es_type: 'search_as_you_type',
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    campus: {
        type: String,
        required: true,
        es_indexed: true,
        es_type: 'search_as_you_type',
    }
});

elasticConnection['populate'] = [
    {path: 'institution', select: 'name'},
]

CourseSchema.plugin(mongoosastic, elasticConnection);
CourseSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Course', CourseSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;