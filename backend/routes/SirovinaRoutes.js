const express = require('express');
const Sirovina = require('../models/Sirovina');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
       const sirovine = await Sirovina.find().populate('dobavljac_id');
       res.send(sirovine);
   } catch (e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.post('/', async ({body}, res) => {
   try {
       const { naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id } = body;
       if(!naziv || !kolicina || !min_kolicina
           || !cijena || !jedinica_mjere ||  !body.hasOwnProperty('da_li_se_koristi') || !dobavljac_id) {
           return res.status(400).send({ message: 'Nedostaju podaci za kreiranje sirovine' });
       }

       const sirovina = new Sirovina({ naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id});

       await sirovina.save();

       res.send(sirovina);
   } catch(e) {
       res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
   }
});

router.patch('/:id', async ({body, params}, res) => {
    try {
        const {  naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id } = body;
        if(!naziv || !kolicina || !min_kolicina
            || !cijena || !jedinica_mjere ||  !body.hasOwnProperty('da_li_se_koristi') || !dobavljac_id) {
            return res.status(400).send({ message: 'Nedostaju podaci za uređivanje sirovine' });
        }

        const sirovina = await Sirovina.findByIdAndUpdate(params.id,
            { naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id });
        if(!sirovina) return res.status(400).send({message: 'Uređivanje nije uredu'});

        res.send(sirovina);
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

router.delete('/:id', async ({params}, res) => {
    try {
        await Sirovina.findOneAndDelete({_id: params.id});
        res.send({ message: 'Sirovina uspješno obrisana' });
    } catch(e) {
        res.status(400).send({ message: e?.message || 'Nešto nije uredu' });
    }
});

module.exports = router;