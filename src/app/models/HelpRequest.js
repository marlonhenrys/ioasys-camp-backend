const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const elasticConnection = require('../../config/elasticConnection.json');

const HelpRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    title: {
        type: String,
        required: true,
        es_indexed: true,
    },
    body: {
        type: String,
        required: true,
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

HelpRequestSchema.plugin(mongoosastic, elasticConnection);

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);