const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ime: {
        type: String,
        required: true,
        trim: true,
    },
    prezime: {
        type: String,
        required: true,
        trim: true,
    },
    broj_telefona: {
        type: String,
        required: true,
        trim: true,
    },
    adresa: {
        type: String,
        required: true,
        trim: true,
    },
    email_adresa: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    datum_zaposlenja: {
        type: Date,
        required: true,
        trim: true,
    },
    datum_otkaza: {
        type: Date,
        trim: true,
    },
    korisnik_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik',
        required: true,
    }
}, { collection: 'Zaposlenik' });

const Zaposlenik = mongoose.model('Zaposlenik', schema);

module.exports = Zaposlenik;