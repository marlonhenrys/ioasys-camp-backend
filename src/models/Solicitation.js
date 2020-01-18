const mongoose = require('mongoose')

const SolicitationSchema = new mongoose.Schema({
    requester: {
        type: mongoose.ObjectId,
        required: true,
    },
    helper: {
        type: mongoose.ObjectId,
    },
    subject: {
        type: mongoose.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
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

module.exports = mongoose.model('Solicitation', SolicitationSchema);