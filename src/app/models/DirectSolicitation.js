const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');

const elasticConnection = require('../../config/elasticConnection.json');

const DirectSolicitationSchema = new mongoose.Schema({
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_schema: Student,
        es_indexed: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_schema: Student,
        es_indexed: true,
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

DirectSolicitationSchema.plugin(mongoosastic, elasticConnection);

module.exports = mongoose.model('DirectSolicitation', DirectSolicitationSchema);