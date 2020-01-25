const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Institution', InstitutionSchema);