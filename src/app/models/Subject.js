const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const SubjectSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    name: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

SubjectSchema.plugin(mongoosastic, {

});
SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subject', SubjectSchema);