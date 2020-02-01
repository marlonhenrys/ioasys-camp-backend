const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');

const elasticConnection = require('../../config/elasticConnection.json');

const DirectSolicitationSchema = new mongoose.Schema({
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

elasticConnection['populate'] = [
    {path: 'helper'},
    {path: 'requester'},
]

DirectSolicitationSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('DirectSolicitation', DirectSolicitationSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;