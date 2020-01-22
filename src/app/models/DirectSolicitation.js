const mongoose = require('mongoose');

const DirectSolicitationSchema = new mongoose.Schema({
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
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