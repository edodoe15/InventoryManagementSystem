import './index.css';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import {IconButton} from "@mui/material";
import {useState} from "react";
import KorisnikDetaljiModal from "../KorisnikDetaljiModal";
import KorisnikBrisanjeModal from "../KorisnikBrisanjeModal";
import {deleteKorisnik} from "../../api/korisnici";
import KorisnikDodajUrediModal from "../KorisnikDodajUrediModal";

const Korisnik = (
    {
        id,
        moj_profil,
        uloga,
        korisnicko_ime,
        ime,
        prezime,
        broj_telefona,
        adresa,
        email_adresa,
        datum_zaposlenja,
        datum_otkaza,
        obrisiKorisnikaIzListe,
        dohvatiKorisnike
    }) => {
    const [detaljiOpen, setDetaljiOpen] = useState(false);
    const [brisanjeOpen, setBrisanjeOpen] = useState(false);
    const [uredjivanjeOpen, setUredjivanjeOpen] = useState(false);

    const potvrdiBrisanje = async () => {
        try {
            await deleteKorisnik(id);
            obrisiKorisnikaIzListe(id);
        } catch (e) {
            console.log(e);
        }
    }

    return <div className={`korisnik ${moj_profil ? 'korisnik-moj-profil': ''}`}>
        <div className='korisnik-uloga'>
            {uloga?.toUpperCase()}
        </div>
        <div className='korisnik-sadrzaj'>
            <div>
                {uloga === 'admin' ? korisnicko_ime : `${korisnicko_ime} (${ime} ${prezime})`}
            </div>
            <div className='korisnik-akcije'>
                {moj_profil ? <span className='korisnik-moj-profil-tekst'>MOJ PROFIL</span>:
                <>
                    <IconButton onClick={() => setDetaljiOpen(true)}>
                        <RemoveRedEye/>
                    </IconButton>
                    <IconButton>
                        <Edit onClick={() => setUredjivanjeOpen(true)}/>
                    </IconButton>
                    <IconButton>
                        <Delete onClick={() => {
                            setBrisanjeOpen(true);
                        }
                        }/>
                    </IconButton>
                </>}
            </div>
        </div>
        <KorisnikDetaljiModal
            open={detaljiOpen}
            handleClose={() => setDetaljiOpen(false)}
            korisnicko_ime={korisnicko_ime}
            uloga={uloga}
            ime={ime}
            prezime={prezime}
            broj_telefona={broj_telefona}
            adresa={adresa}
            email_adresa={email_adresa}
            datum_zaposlenja={datum_zaposlenja}
            datum_otkaza={datum_otkaza}
        />
        <KorisnikBrisanjeModal
            open={brisanjeOpen}
            handleClose={() => setBrisanjeOpen(false)}
            potvrdiBrisanje={potvrdiBrisanje}
            korisnik={(ime && prezime) ? `${korisnicko_ime} (${ime} ${prezime})` : korisnicko_ime}
        />
        <KorisnikDodajUrediModal
            open={uredjivanjeOpen}
            handleClose={() => setUredjivanjeOpen(false)}
            id={id}
            korisnicko_ime={korisnicko_ime}
            ime={ime}
            prezime={prezime}
            broj_telefona={broj_telefona}
            adresa={adresa}
            email_adresa={email_adresa}
            datum_zaposlenja={datum_zaposlenja}
            datum_otkaza={datum_otkaza}
            uloga={uloga}
            dohvatiKorisnike={dohvatiKorisnike}
        />
    </div>
}

export default Korisnik;