import Modal from "../Modal";
import {
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@mui/material";
import {useState} from "react";
import './index.css';
import {patchSirovina, postSirovina} from "../../api/sirovine";

const SirovinaDodajUrediModal = (
    {
        dodavanje,
        open,
        handleClose,
        id,
        naziv: Naziv,
        kolicina: Kolicina,
        min_kolicina: Min_kolicina,
        cijena: Cijena,
        jedinica_mjere: Jedinica_mjere,
        da_li_se_koristi: Da_li_se_koristi,
        dobavljac: Dobavljac,
        dobavljaci,
        dohvatiSirovine
    }
) => {
    const [naziv, setNaziv] = useState(Naziv || '');
    const [kolicina, setKolicina] = useState(Kolicina || null);
    const [min_kolicina, setMin_kolicina] = useState(Min_kolicina || null);
    const [cijena, setCijena] = useState(Cijena || null);
    const [jedinica_mjere, setJedinica_mjere] = useState(Jedinica_mjere || '');
    const [da_li_se_koristi, setDa_li_se_koristi] = useState(Da_li_se_koristi || false);
    const [dobavljac_id, setDobavljac_id] = useState(Dobavljac?._id || '');
    const [greska, setGreska] = useState('');
    const [loading, setLoading] = useState(false);

    const zatvori = () => {
       if(dodavanje) {
           setNaziv('');
           setKolicina(null);
           setMin_kolicina(null);
           setCijena(null);
           setJedinica_mjere('');
           setDa_li_se_koristi(false);
           setDobavljac_id('');
           setGreska('');
       }
        handleClose();
    }

    const potvrdi = async () => {
        try {
            setLoading(true);
            if(dodavanje) {
                await postSirovina({
                    naziv,
                    kolicina,
                    min_kolicina,
                    cijena,
                    jedinica_mjere,
                    da_li_se_koristi,
                    dobavljac_id,
                });
            } else {
                await patchSirovina(id,{
                    naziv,
                    kolicina,
                    min_kolicina,
                    cijena,
                    jedinica_mjere,
                    da_li_se_koristi,
                    dobavljac_id,
                    });
            }
            dohvatiSirovine();
            zatvori();
        } catch(e) {
            setGreska(e?.response?.data?.message || 'Nešto nije uredu');
        } finally {
            setLoading(false);
        }
    }

    return <Modal open={open}>
        <div className='sirovina-dodaj-uredi-naslov'>
            {dodavanje ? 'Dodavanje sirovine' : 'Uređivanje sirovine'}
        </div>
        <div className='sirovina-dodaj-uredi-sadrzaj'>
            {loading ? <CircularProgress/> : <>
                <TextField size='small' label='Naziv' value={naziv} onChange={(e) => setNaziv(e.target.value)}/>
                <TextField size='small' type='number' label='Količina' value={kolicina} onChange={(e) => setKolicina(e.target.value)}/>
                <TextField size='small' type='number' label='Minimalna količina' value={min_kolicina} onChange={(e) => setMin_kolicina(e.target.value)}/>
                <TextField size='small' type='number' label='Cijena' value={cijena} onChange={(e) => setCijena(e.target.value)}/>
                <TextField size='small' label='Jedinica mjere' value={jedinica_mjere} onChange={(e) => setJedinica_mjere(e.target.value)}/>
                <div className='sirovina-da-li-se-koristi-kontejner'>
                    <div className='sirovina-da-li-se-koristi-labela'>Da li se koristi</div>
                    <div className='sirovina-da-li-se-koristi-sadrzaj'>
                        <span>Ne</span>
                        <Switch checked={da_li_se_koristi} onChange={(e) => setDa_li_se_koristi(e.target.checked)}/>
                        <span>Da</span>
                    </div>
                </div>
                <FormControl>
                    <InputLabel size='small' id='dobavljac-label'>Dobavljač</InputLabel>
                    <Select id='dobavljac-label' labelId='dobavljac-label' onChange={(e) => setDobavljac_id(e.target.value)} value={dobavljac_id} label='Dobavljač' size='small' >
                        {dobavljaci.map(d =>  <MenuItem key={d?._id} value={d?._id}>{d?.naziv}</MenuItem>)}
                    </Select>
                </FormControl>
                {!!greska && <Chip label={greska} color='error'/> }
            </>}
        </div>
        <div className='sirovina-dodaj-uredi-footer'>
            <Button color='error' variant='contained' onClick={zatvori}>
                Zatvori
            </Button>
            <Button variant='contained' onClick={potvrdi}>
                {dodavanje ? 'Dodaj' : 'Spasi'}
            </Button>
        </div>
    </Modal>;
}

export default SirovinaDodajUrediModal;