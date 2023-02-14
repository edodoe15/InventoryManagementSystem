import './index.css';
import {useEffect, useState} from "react";
import {getKorisnici} from "../../api/korisnici";
import {CircularProgress, Fab} from "@mui/material";
import Korisnik from "../Korisnik";
import {getLoggedData} from "../../utils/localStorage";
import {Add} from "@mui/icons-material";
import KorisnikDodajUrediModal from "../KorisnikDodajUrediModal";

const ZaposleniciTab = () => {
    const [korisnici, setKorisnici] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dodajOpen, setDodajOpen] = useState(false);

    const {korisnicko_ime} = getLoggedData();

    const dohvatiKorisnike = async () => {
            try {
                setLoading(true);
                const { data } = await getKorisnici();
                setKorisnici([
                    data.find(korisnik => korisnik.korisnicko_ime === korisnicko_ime),
                    ...data.filter(korisnik => korisnik.korisnicko_ime !== korisnicko_ime)
                ]);
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
    }

    useEffect(() => {
        (async () => {
            await dohvatiKorisnike();
        })();
    }, []);

    return <div className='zaposlenici-tab'>
        <Fab onClick={() => setDodajOpen(true)} size='small' color='primary' className='admin-panel-dodaj'>
            <Add/>
        </Fab>
        {loading ? <CircularProgress/> :
            <>{korisnici.map(korisnik => <Korisnik
                dohvatiKorisnike={dohvatiKorisnike}
                moj_profil={korisnicko_ime === korisnik.korisnicko_ime}
                key={korisnik._id}
                id={korisnik._id}
                obrisiKorisnikaIzListe={() => setKorisnici(prevState =>  prevState.filter(k => k._id !== korisnik._id))}
                uloga={korisnik?.uloga}
                korisnicko_ime={korisnik?.korisnicko_ime}
                {...(korisnik?.uloga === 'zaposlenik' && {
                    ime: korisnik?.zaposlenik_data?.[0]?.ime,
                    prezime: korisnik?.zaposlenik_data?.[0]?.prezime,
                    broj_telefona: korisnik?.zaposlenik_data?.[0]?.broj_telefona,
                    adresa: korisnik?.zaposlenik_data?.[0]?.adresa,
                    email_adresa: korisnik?.zaposlenik_data?.[0]?.email_adresa,
                    datum_zaposlenja: korisnik?.zaposlenik_data?.[0]?.datum_zaposlenja,
                    datum_otkaza: korisnik?.zaposlenik_data?.[0]?.datum_otkaza,
                })}
            />)}</>}
        <KorisnikDodajUrediModal dohvatiKorisnike={dohvatiKorisnike} open={dodajOpen} handleClose={() => setDodajOpen(false)} dodavanje={true}/>
    </div>
}

export default ZaposleniciTab;