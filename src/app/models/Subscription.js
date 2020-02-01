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
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    help_request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HelpRequest',
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
    {path: 'candidate'},
    {path: 'help_request'},
]

SubscriptionSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('Subscription', SubscriptionSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;