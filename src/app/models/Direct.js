const mongoose = require('mongoose');

const DirectSchema = new mongoose.Schema({
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
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

const Model = mongoose.model('Direct', DirectSchema);

module.exports = Model;