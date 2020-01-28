const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');
const HelpRequest = require('./HelpRequest');

const elasticConnection = require("../../config/elasticConnection.json");

const SubscriptionSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false,
        es_schema: Student,
        es_indexed: true,
    },
    help_request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HelpRequest',
        required: true,
        es_schema: HelpRequest,
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

SubscriptionSchema.plugin(mongoosastic, elasticConnection);

module.exports = mongoose.model('Subscription', SubscriptionSchema);