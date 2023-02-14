import Modal from "../Modal";
import {Button, Chip, CircularProgress, TextField} from "@mui/material";
import {useState} from "react";
import './index.css';
import {patchDobavljac, postDobavljac} from "../../api/dobavljaci";
import {LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const DobavljacDodajUrediModal = (
    {
        dodavanje,
        open,
        handleClose,
        id,
        naziv: Naziv,
        jib: Jib,
        pdv: Pdv,
        broj_telefona: Broj_telefona,
        kontakt_osoba: Kontakt_osoba,
        email_adresa: Email_adresa,
        datum_pocetka: Datum_pocetka,
        datum_zavrsetka: Datum_zavrsetka,
        dohvatiDobavljace
    }
) => {
    const [naziv, setNaziv] = useState(Naziv || '');
    const [jib, setJib] = useState(Jib || '');
    const [pdv, setPdv] = useState(Pdv || '');
    const [broj_telefona, setBroj_telefona] = useState(Broj_telefona || '');
    const [kontakt_osoba, setKontakt_osoba] = useState(Kontakt_osoba || '');
    const [email_adresa, setEmail_Adresa] = useState(Email_adresa || '');
    const [datum_pocetka, setDatum_pocetka] = useState(Datum_pocetka ? dayjs(Datum_pocetka) :  null);
    const [datum_zavrsetka, setDatum_zavrsetka] = useState(Datum_zavrsetka ? dayjs(Datum_zavrsetka) :  null);
    const [greska, setGreska] = useState('');
    const [loading, setLoading] = useState(false);

    const zatvori = () => {
       if(dodavanje) {
           setNaziv('');
           setJib('');
           setPdv('');
           setBroj_telefona('');
           setKontakt_osoba('');
           setEmail_Adresa('');
           setDatum_pocetka(null);
           setDatum_zavrsetka(null);
           setGreska('');
       }
        handleClose();
    }

    const potvrdi = async () => {
        try {
            setLoading(true);
            if(dodavanje) {
                await postDobavljac({
                    naziv,
                    jib,
                    pdv,
                    broj_telefona,
                    kontakt_osoba,
                    email_adresa,
                    datum_pocetka
                });
            } else {
                await patchDobavljac(id,{
                    naziv,
                    jib,
                    pdv,
                    broj_telefona,
                    kontakt_osoba,
                    email_adresa,
                    datum_pocetka,
                    datum_zavrsetka
                    });
            }
            dohvatiDobavljace();
            zatvori();
        } catch(e) {
            setGreska(e?.response?.data?.message || 'Nešto nije uredu');
        } finally {
            setLoading(false);
        }
    }

    return <Modal open={open}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='dobavljac-dodaj-uredi-naslov'>
            {dodavanje ? 'Dodavanje dobavljača' : 'Uređivanje dobavljača'}
        </div>
        <div className='dobavljac-dodaj-uredi-sadrzaj'>
            {loading ? <CircularProgress/> : <>
                <TextField size='small' label='Naziv' value={naziv} onChange={(e) => setNaziv(e.target.value)}/>
                <TextField size='small' label='JIB' value={jib} onChange={(e) => setJib(e.target.value)}/>
                <TextField size='small' label='PDV' value={pdv} onChange={(e) => setPdv(e.target.value)}/>
                <TextField size='small' label='Broj telefona' value={broj_telefona} onChange={(e) => setBroj_telefona(e.target.value)}/>
                <TextField size='small' label='Kontakt osoba' value={kontakt_osoba} onChange={(e) => setKontakt_osoba(e.target.value)}/>
                <TextField size='small' label='Email adresa' value={email_adresa} onChange={(e) => setEmail_Adresa(e.target.value)}/>
                <DesktopDatePicker
                    disabled={!dodavanje}
                    label='Datum početka'
                    value={datum_pocetka}
                    onChange={(value) => setDatum_pocetka(value)}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    inputFormat="DD/MM/YYYY"
                />
                {(!!Datum_zavrsetka || !dodavanje) &&
                <DesktopDatePicker
                    label='Datum završetka'
                    value={datum_zavrsetka}
                    onChange={(value) => setDatum_zavrsetka(value)}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    inputFormat="DD/MM/YYYY"
                />}
                {!!greska && <Chip label={greska} color='error'/> }
            </>}
        </div>
        <div className='dobavljac-dodaj-uredi-footer'>
            <Button color='error' variant='contained' onClick={zatvori}>
                Zatvori
            </Button>
            <Button variant='contained' onClick={potvrdi}>
                {dodavanje ? 'Dodaj' : 'Spasi'}
            </Button>
        </div>
        </LocalizationProvider>
    </Modal>;
}

export default DobavljacDodajUrediModal;