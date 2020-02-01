const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const elasticConnection = require('../../config/elasticConnection.json');

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
        es_type: 'search_as_you_type',
    }
});

InstitutionSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('Institution', InstitutionSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;