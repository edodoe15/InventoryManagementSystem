const express = require('express');
const Korisnik = require('../models/Korisnik');

const router = express.Router();

router.post('/login', async ({ body }, res) => {
    try {
        const korisnik = await Korisnik.findOne({ korisnicko_ime: body.korisnicko_ime });
        if(!korisnik) return res.status(400).send({ message: 'Neispravno korisničko ime ili šifra' });
        if(korisnik.sifra !== body.sifra) {
            return res.status(400).send({ message: 'Neispravna šifra' });
        }
        res.send(korisnik);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.patch('/password-change/:id', async ({body, params}, res) => {
    try {
        const {staraSifra, novaSifra, potvrdaNoveSifre} = body;
        if(!staraSifra || !novaSifra || !potvrdaNoveSifre) {
            return res.status(400).send({ message: 'Nedostaju podaci za promjenu šifre' });
        }
        if(novaSifra !== potvrdaNoveSifre) {
            return res.status(400).send({message: 'Nova šifra i njena potvrda nisu identične'});
        }
        const korisnik = await Korisnik.findById(params.id);
        if(!korisnik) return res.status(400).send({ message: 'Nepostojećoi korisnik' });
        if(korisnik.sifra !== staraSifra) {
            return res.status(400).send({message: 'Neispravna stara šifra'});
        }
        korisnik.sifra = novaSifra;
        const novi = await korisnik.save();
        res.send(novi);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

module.exports = router;