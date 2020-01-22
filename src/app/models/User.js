const mongoose = require('mongoose');
const crypto = require('crypto-js');

const UserSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', function (next) {
    const encrypted = crypto.SHA256(this.password);
    this.password = encrypted;

    next();
});

module.exports = mongoose.model('User', UserSchema);