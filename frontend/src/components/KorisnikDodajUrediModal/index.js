import Modal from "../Modal";
import {Button, Chip, CircularProgress, Switch, TextField} from "@mui/material";
import {useState} from "react";
import './index.css';
import {patchAdmin, patchZaposlenik, postAdmin, postZaposlenik} from "../../api/korisnici";
import {LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const KorisnikDodajUrediModal = (
    {
        id,
        uloga,
        dodavanje,
        open,
        handleClose,
        korisnicko_ime: Korisnicko_ime,
        ime: Ime,
        prezime: Prezime,
        broj_telefona: Broj_telefona,
        adresa: Adresa,
        email_adresa: Email_adresa,
        datum_zaposlenja: Datum_zaposlenja,
        datum_otkaza: Datum_otkaza,
        dohvatiKorisnike
    }
) => {
    const [korisnicko_ime, setKorisnicko_ime] = useState(Korisnicko_ime || '');
    const [ime, setIme] = useState(Ime || '');
    const [prezime, setPrezime] = useState(Prezime || '');
    const [broj_telefona, setBroj_telefona] = useState(Broj_telefona || '');
    const [adresa, setAdresa] = useState(Adresa || '');
    const [email_adresa, setEmail_Adresa] = useState(Email_adresa || '');
    const [datum_zaposlenja, setDatum_zaposlenja] = useState(Datum_zaposlenja ? dayjs(Datum_zaposlenja) : null);
    const [datum_otkaza, setDatum_otkaza] = useState(Datum_otkaza ? dayjs(Datum_otkaza) : null);
    const [isZaposlenik, setIsZaposlenik] = useState(dodavanje ? false : uloga === 'zaposlenik');
    const [greska, setGreska] = useState('');
    const [loading, setLoading] = useState(false);

    const zatvori = () => {
        if(dodavanje) {
            setKorisnicko_ime('');
            setIme('');
            setPrezime('');
            setBroj_telefona('');
            setAdresa('');
            setEmail_Adresa('');
            setDatum_zaposlenja(null);
            setDatum_otkaza(null);
            setIsZaposlenik(false);
            setGreska('');
        }
        handleClose();
    }

    const potvrdi = async () => {
        try {
            setLoading(true);
            if(dodavanje) {
                if(isZaposlenik) {
                    await postZaposlenik({
                        korisnicko_ime,
                        ime,
                        prezime,
                        broj_telefona,
                        adresa,
                        email_adresa,
                        datum_zaposlenja
                    });
                } else {
                    await postAdmin({ korisnicko_ime });
                }
            } else {
                if(isZaposlenik) {
                    await patchZaposlenik(id,{
                        korisnicko_ime,
                        ime,
                        prezime,
                        broj_telefona,
                        adresa,
                        email_adresa,
                        datum_zaposlenja,
                        datum_otkaza
                    });
                } else {
                    await patchAdmin(id,{ korisnicko_ime });
                }
            }
            dohvatiKorisnike();
            zatvori();
        } catch(e) {
            setGreska(e?.response?.data?.message || 'Nešto nije uredu');
        } finally {
            setLoading(false);
        }
    }

    return <Modal open={open}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='korisnik-dodaj-uredi-naslov'>
            {dodavanje ? 'Dodavanje korisnika' : 'Uređivanje korisnika'}
        </div>
        <div className='korisnik-dodaj-uredi-sadrzaj'>
            {loading ? <CircularProgress/> : <>
                {dodavanje && <div className='korisnik-dodaj-uredi-napomena'>
                    * Prilikom dodavanja novog korisnika, šifra se inicijalno postavlja na '12345678'
                </div>}
                <div>
                    <span>Admin</span>
                    <Switch disabled={!dodavanje} checked={isZaposlenik} onChange={(e) => setIsZaposlenik(e.target.checked)}/>
                    <span>Zaposlenik</span>
                </div>
                <TextField size='small' label='Korisničko ime' value={korisnicko_ime} onChange={(e) => setKorisnicko_ime(e.target.value)}/>
                {(!!Ime || isZaposlenik) && <TextField size='small' label='Ime' value={ime} onChange={(e) => setIme(e.target.value)}/>}
                {(!!Prezime || isZaposlenik) && <TextField size='small' label='Prezime' value={prezime} onChange={(e) => setPrezime(e.target.value)}/>}
                {(!!Broj_telefona || isZaposlenik) && <TextField size='small' label='Broj telefona' value={broj_telefona} onChange={(e) => setBroj_telefona(e.target.value)}/>}
                {(!!Adresa || isZaposlenik) && <TextField size='small' label='Adresa' value={adresa} onChange={(e) => setAdresa(e.target.value)}/>}
                {(!!Email_adresa || isZaposlenik) && <TextField size='small' label='Email adresa' value={email_adresa} onChange={(e) => setEmail_Adresa(e.target.value)}/>}
                {(!!Datum_zaposlenja || isZaposlenik) &&
                <DesktopDatePicker
                    disabled={!dodavanje}
                    label='Datum zaposlenja'
                    value={datum_zaposlenja}
                    onChange={(value) => setDatum_zaposlenja(value)}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    inputFormat="DD/MM/YYYY"
                />}
                {((!!Datum_zaposlenja || isZaposlenik) && !dodavanje) &&
                <DesktopDatePicker
                    label='Datum otkaza'
                    value={datum_otkaza}
                    onChange={(value) => setDatum_otkaza(value)}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    inputFormat="DD/MM/YYYY"
                />}
                {!!greska && <Chip label={greska} color='error'/> }
            </>}
        </div>
        <div className='korisnik-dodaj-uredi-footer'>
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

export default KorisnikDodajUrediModal;