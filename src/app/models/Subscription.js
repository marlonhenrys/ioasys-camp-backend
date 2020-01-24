const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false,
    },
    help_request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HelpRequest',
        required: true,
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

module.exports = mongoose.model('Subscription', SubscriptionSchema);