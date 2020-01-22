const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false,
    },
    solicitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitation',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    state: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);