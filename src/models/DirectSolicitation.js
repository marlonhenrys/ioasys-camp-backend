const mongoose = require('mongoose');

const DirectSolicitationSchema = new mongoose.Schema({
    helper: {
        type: mongoose.ObjectId,
        required: true,
    },
    requester: {
        type: mongoose.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('DirectSolicitation', DirectSolicitationSchema);