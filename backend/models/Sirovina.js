const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true,
        trim: true,
    },
    kolicina: {
        type: Number,
        required: true,
        min: 1
    },
    min_kolicina: {
        type: Number,
        required: true,
        min: 1
    },
    cijena: {
        type: Number,
        required: true,
        min: 1
    },
    jedinica_mjere: {
        type: String,
        required: true,
        trim: true,
    },
    da_li_se_koristi: {
        type: Boolean,
        required: true,
    },
    dobavljac_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dobavljac',
        required: true,
    }
}, { collection: 'Sirovina' });

const Sirovina = mongoose.model('Sirovina', schema);

module.exports = Sirovina;