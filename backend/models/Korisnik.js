const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    korisnicko_ime: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    sifra: {
        type: String,
        required: true,
    },
    uloga: {
        type: String,
        required: true,
        enum: ['admin', 'zaposlenik']
    },
    zaposlenik_data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zaposlenik'
    }]
}, { collection: 'Korisnik' });

const Korisnik = mongoose.model('Korisnik', schema);

module.exports = Korisnik;