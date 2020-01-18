const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.ObjectId,
        required: false,
    },
    solicitation: {
        type: mongoose.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);