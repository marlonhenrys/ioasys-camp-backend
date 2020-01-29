const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');
const Subject = require('./Subject');

const elasticConnection = require('../../config/elasticConnection.json');

const HelpRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_schema: Student,
        es_indexed: true,
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        es_schema: Student,
        es_indexed: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
        es_schema: Subject,
        es_indexed: true,
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

const Model = mongoose.model('HelpRequest', HelpRequestSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;