const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);