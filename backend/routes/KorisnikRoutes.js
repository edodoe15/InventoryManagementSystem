const express = require('express');
const Korisnik = require('../models/Korisnik');
const Zaposlenik = require("../models/Zaposlenik");

const router = express.Router();

router.get('/', async (req, res) => {
   try {
       const users = await Korisnik.find().populate('zaposlenik_data');
       res.send(users);
   } catch (e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.post('/admin', async ({body}, res) => {
   try {
       const { korisnicko_ime } = body;
       if(!korisnicko_ime) {
           return res.status(400).send({ message: 'Nedostaju podaci za kreiranje admina' });
       }

       const korisnik = new Korisnik({korisnicko_ime, sifra: '12345678', uloga: 'admin'});

       await korisnik.save();

       res.send(korisnik);
   } catch(e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.patch('/admin/:id', async ({body, params}, res) => {
    try {
        const { korisnicko_ime } = body;
        if(!korisnicko_ime) {
            return res.status(400).send({ message: 'Nedostaju podaci za uređivanje admina' });
        }

        const korisnik = await Korisnik.findByIdAndUpdate(params.id, { korisnicko_ime });
        if(!korisnik) return res.status(400).send({message: 'Uređivanje nije uredu'});

        res.send(korisnik);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.delete('/:id', async ({params}, res) => {
    try {
        await Korisnik.findOneAndDelete({_id: params.id});
        res.send({ message: 'Korisnik uspješno obrisan' });
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.post('/zaposlenik', async ({body},res) => {
    let kreiraniKorisnik = null;

    try {
        const { korisnicko_ime, ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja } = body;
        if(!korisnicko_ime || !ime || !prezime
            || !broj_telefona || !adresa ||  !email_adresa || !datum_zaposlenja) {
            return res.status(400).send({ message: 'Nedostaju podaci za kreiranje zaposlenika' });
        }

        const korisnik = new Korisnik({korisnicko_ime, sifra: '12345678', uloga: 'zaposlenik'});

        kreiraniKorisnik = await korisnik.save();

        const zaposlenik = new Zaposlenik({ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, korisnik_id: kreiraniKorisnik._id});

        const kreiraniZaposlenik = await zaposlenik.save();

        korisnik.zaposlenik_data.push( kreiraniZaposlenik ._id);

        kreiraniKorisnik = await korisnik.save();

        kreiraniZaposlenik.korisnicko_ime = korisnicko_ime;
        kreiraniZaposlenik.sifra = '12345678';

        res.send(kreiraniZaposlenik);
    } catch(e) {
        if(!!kreiraniKorisnik) {
            try {
                await Korisnik.findOneAndDelete({_id: kreiraniKorisnik._id});
            } catch(e) {
                return res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
            }
        }
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.patch('/zaposlenik/:id', async ({body, params},res) => {
    try {
        const { korisnicko_ime, ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza } = body;
        if(!korisnicko_ime || !ime || !prezime
            || !broj_telefona || !adresa ||  !email_adresa || !datum_zaposlenja) {
            return res.status(400).send({ message: 'Nedostaju podaci za uređivanje zaposlenika' });
        }

        if( datum_otkaza < datum_zaposlenja )
            return res.status(400).send({message: 'Nije moguće postaviti datum otkaza prije datuma zaposlenja'});

        const korisnik = await Korisnik.findByIdAndUpdate(params.id, {
            korisnicko_ime,
        });

        if(!korisnik) return res.status(400).send({message: 'Uređivanje nije uredu'});

        const zaposlenik = await Zaposlenik.findOne({korisnik_id: korisnik._id});

        const noviZaposlenik = await Zaposlenik.findByIdAndUpdate(zaposlenik._id, {
            ime,
            prezime,
            broj_telefona,
            adresa,
            email_adresa,
            datum_zaposlenja,
            datum_otkaza
        });

        if(!noviZaposlenik) return res.status(400).send({message: 'Uređivanje nije uredu'});

        res.send(noviZaposlenik);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

module.exports = router;