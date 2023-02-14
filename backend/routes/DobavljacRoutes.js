const express = require('express');
const Dobavljac = require('../models/Dobavljac');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
       const dobavljaci = await Dobavljac.find();
       res.send(dobavljaci);
   } catch (e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.post('/', async ({body}, res) => {
   try {
       const { naziv, jib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka } = body;
       if(!naziv || !jib || !pdv
           || !broj_telefona || !kontakt_osoba ||  !email_adresa || !datum_pocetka) {
           return res.status(400).send({ message: 'Nedostaju podaci za kreiranje dobavljača' });
       }

       const dobavljac = new Dobavljac({naziv, jib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka});

       await dobavljac.save();

       res.send(dobavljac);
   } catch(e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.patch('/:id', async ({body, params}, res) => {
    try {
        const {  naziv, jib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka, datum_zavrsetka } = body;
        if(!naziv || !jib || !pdv
            || !broj_telefona || !kontakt_osoba ||  !email_adresa || !datum_pocetka) {
            return res.status(400).send({ message: 'Nedostaju podaci za uređivanje dobavljača' });
        }

        if( datum_zavrsetka < datum_pocetka )
            return res.status(400).send({message: 'Nije moguće postaviti datum završetka prije datuma početka'});

        const dobavljac = await Dobavljac.findByIdAndUpdate(params.id, 
            { naziv, jib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka, datum_zavrsetka });
        if(!dobavljac) return res.status(400).send({message: 'Uređivanje nije uredu'});

        res.send(dobavljac);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.delete('/:id', async ({params}, res) => {
    try {
        await Dobavljac.findOneAndDelete({_id: params.id});
        res.send({ message: 'Dobavljač uspješno obrisan' });
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

module.exports = router;