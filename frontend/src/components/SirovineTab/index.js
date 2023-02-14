import './index.css';
import {useEffect, useState} from "react";
import {CircularProgress, Fab} from "@mui/material";
import {Add} from "@mui/icons-material";
import {getSirovine} from "../../api/sirovine";
import Sirovina from "../Sirovina";
import SirovinaDodajUrediModal from "../SirovinaDodajUrediModal";
import {getDobavljaci} from "../../api/dobavljaci";

const SirovineTab = () => {
    const [sirovine, setSirovine] = useState([]);
    const [dobavljaci, setDobavljaci] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dodajOpen, setDodajOpen] = useState(false);

    const dohvatiSirovine = async () => {
            try {
                setLoading(true);
                const { data } = await getSirovine();
                setSirovine(data);
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
    }

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
            await Promise.all([dohvatiSirovine(), dohvatiDobavljace()]);
        })();
    }, []);

    return <div className='sirovine-tab'>
        <Fab onClick={() => setDodajOpen(true)} size='small' color='primary' className='admin-panel-dodaj'>
            <Add/>
        </Fab>
        {loading ? <CircularProgress/> :
            <>
            {sirovine?.length ? sirovine.map(sirovina => <Sirovina
                    key={sirovina?._id}
                    id={sirovina?._id}
                    naziv={sirovina?.naziv}
                    kolicina={sirovina?.kolicina}
                    min_kolicina={sirovina?.min_kolicina}
                    jedinica_mjere={sirovina?.jedinica_mjere}
                    cijena={sirovina?.cijena}
                    da_li_se_koristi={sirovina?.da_li_se_koristi}
                    dobavljac={sirovina?.dobavljac_id}
                    dobavljaci={dobavljaci}
                    obrisiSirovinuIzListe={() => setSirovine(prevState =>  prevState.filter(s => s._id !== sirovina._id))}
                    dohvatiSirovine={dohvatiSirovine}
                />) : <div className='sirovine-tab-prazno'>Nema dostupnih sirovina.</div>}
            </>}
        <SirovinaDodajUrediModal dobavljaci={dobavljaci} dohvatiSirovine={dohvatiSirovine} open={dodajOpen} handleClose={() => setDodajOpen(false)} dodavanje={true}/>
    </div>
}

export default SirovineTab;