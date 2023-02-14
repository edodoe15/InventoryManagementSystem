import './index.css';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import {IconButton} from "@mui/material";
import {useState} from "react";
import {deleteDobavljac} from "../../api/dobavljaci";
import DobavljacBrisanjeModal from "../DobavljacBrisanjeModal";
import DobavljacDetaljiModal from "../DobavljacDetaljiModal";
import DobavljacDodajUrediModal from "../DobavljacDodajUrediModal";

const Dobavljac = (
    {
        id,
        naziv,
        jib,
        pdv,
        broj_telefona,
        kontakt_osoba,
        email_adresa,
        datum_pocetka,
        datum_zavrsetka,
        obrisiDobavljacaIzListe,
        dohvatiDobavljace
    }) => {
    const [detaljiOpen, setDetaljiOpen] = useState(false);
    const [brisanjeOpen, setBrisanjeOpen] = useState(false);
    const [uredjivanjeOpen, setUredjivanjeOpen] = useState(false);

    const potvrdiBrisanje = async () => {
        try {
            await deleteDobavljac(id);
            obrisiDobavljacaIzListe(id);
        } catch (e) {
            console.log(e);
        }
    }

    return <div className='dobavljac'>
        <div className='dobavljac-jib'>
            <div className='dobavljac-jib-labela'>JIB</div> &nbsp;
            {jib?.toUpperCase()}
        </div>
        <div className='dobavljac-sadrzaj'>
            <div>
                {naziv}
            </div>
            <div className='dobavljac-akcije'>
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
            </div>
        </div>
        <DobavljacDetaljiModal
            open={detaljiOpen}
            handleClose={() => setDetaljiOpen(false)}
            naziv={naziv}
            jib={jib}
            pdv={pdv}
            broj_telefona={broj_telefona}
            kontakt_osoba={kontakt_osoba}
            email_adresa={email_adresa}
            datum_pocetka={datum_pocetka}
            datum_zavrsetka={datum_zavrsetka}
        />
        <DobavljacBrisanjeModal
            open={brisanjeOpen}
            handleClose={() => setBrisanjeOpen(false)}
            potvrdiBrisanje={potvrdiBrisanje}
            dobavljac={naziv}
        />
        <DobavljacDodajUrediModal
            open={uredjivanjeOpen}
            handleClose={() => setUredjivanjeOpen(false)}
            id={id}
            naziv={naziv}
            jib={jib}
            pdv={pdv}
            broj_telefona={broj_telefona}
            kontakt_osoba={kontakt_osoba}
            email_adresa={email_adresa}
            datum_pocetka={datum_pocetka}
            datum_zavrsetka={datum_zavrsetka}
            dohvatiDobavljace={dohvatiDobavljace}
        />
    </div>
}

export default Dobavljac;