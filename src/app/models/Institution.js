const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

InstitutionSchema.plugin(mongoosastic, {

});

module.exports = mongoose.model('Institution', InstitutionSchema);