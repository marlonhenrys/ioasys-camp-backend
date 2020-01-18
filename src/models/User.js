const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    student: {
        type: mongoose.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);