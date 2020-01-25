const mongoose = require('mongoose');

const HelperListSchema = new mongoose.Schema({
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    }]
});

module.exports = mongoose.model('HelperList', HelperListSchema);