const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true,
        trim: true,
    },
    jib: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    pdv: {
        type: String,
        required: true,
        trim: true,
    },
    broj_telefona: {
        type: String,
        required: true,
        trim: true,
    },
    kontakt_osoba: {
        type: String,
        required: true,
        trim: true,
    },
    email_adresa: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    datum_pocetka: {
        type: Date,
        required: true,
        trim: true,
    },
    datum_zavrsetka: {
        type: Date,
        trim: true,
    },
}, { collection: 'Dobavljac' });

const Dobavljac = mongoose.model('Dobavljac', schema);

module.exports = Dobavljac;