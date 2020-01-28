const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const elasticConnection = require('../../config/elasticConnection.json');

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
    }
});

InstitutionSchema.plugin(mongoosastic, elasticConnection);

module.exports = mongoose.model('Institution', InstitutionSchema);