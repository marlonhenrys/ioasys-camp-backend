const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');
const Subject = require('./Subject');

const elasticConnection = require('../../config/elasticConnection.json');

const HelperListSchema = new mongoose.Schema({
    helper: {
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
    {path: 'subjects', select: 'name'},
    {path: 'helper'},
]

HelperListSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('HelperList', HelperListSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;