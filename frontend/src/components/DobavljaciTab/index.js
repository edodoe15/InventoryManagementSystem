import './index.css';
import {useEffect, useState} from "react";
import {CircularProgress, Fab} from "@mui/material";
import {Add} from "@mui/icons-material";
import {getDobavljaci} from "../../api/dobavljaci";
import Dobavljac from "../Dobavljac";
import DobavljacDodajUrediModal from "../DobavljacDodajUrediModal";

const DobavljaciTab = () => {
    const [dobavljaci, setDobavljaci] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dodajOpen, setDodajOpen] = useState(false);

    const dohvatiDobavljace = async () => {
            try {
                setLoading(true);
                const { data } = await getDobavljaci();
                setDobavljaci(data);
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
    }

    useEffect(() => {
        (async () => {
            await dohvatiDobavljace();
        })();
    }, []);

    return <div className='dobavljaci-tab'>
        <Fab onClick={() => setDodajOpen(true)} size='small' color='primary' className='admin-panel-dodaj'>
            <Add/>
        </Fab>
        {loading ? <CircularProgress/> :
            <>{dobavljaci?.length ?
            dobavljaci.map(dobavljac => <Dobavljac
                key={dobavljac?._id}
                id={dobavljac?._id}
                naziv={dobavljac?.naziv}
                jib={dobavljac?.jib}
                pdv={dobavljac?.pdv}
                broj_telefona={dobavljac?.broj_telefona}
                kontakt_osoba={dobavljac?.kontakt_osoba}
                email_adresa={dobavljac?.email_adresa}
                datum_pocetka={dobavljac?.datum_pocetka}
                datum_zavrsetka={dobavljac?.datum_zavrsetka}
                dohvatiDobavljace={dohvatiDobavljace}
                obrisiDobavljacaIzListe={() => setDobavljaci(prevState =>  prevState.filter(d => d._id !== dobavljac._id))}
            />) : <div className='dobavljaci-tab-prazno'>Nema dostupnih dobavljača.</div>}
            </>}
        <DobavljacDodajUrediModal dohvatiDobavljace={dohvatiDobavljace} open={dodajOpen} handleClose={() => setDodajOpen(false)} dodavanje={true}/>
    </div>
}

export default DobavljaciTab;