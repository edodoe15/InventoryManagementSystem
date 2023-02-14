import Modal from "../Modal";
import {
    Button,
    Chip,
    CircularProgress,
    TextField
} from "@mui/material";
import {useState} from "react";
import './index.css';
import {patchPromijeniSifru} from "../../api/auth";

const PromijeniSifruModal = (
    {
        open,
        handleClose,
        id,
    }
) => {
    const [staraSifra, setStaraSifra] = useState('');
    const [novaSifra, setNovaSifra] = useState('');
    const [potvrdaNoveSifre, setPotvrdaNoveSifre] = useState('');
    const [loading, setLoading] = useState(false);
    const [greska, setGreska] = useState('');

    const zatvori = () => {
        setStaraSifra('');
        setNovaSifra('');
        setPotvrdaNoveSifre('');
        setGreska('');
        handleClose();
    }

    const potvrdi = async () => {
        try {
            setLoading(true);
            await patchPromijeniSifru(id, {
                staraSifra,
                novaSifra,
                potvrdaNoveSifre
            });
            zatvori();
        } catch(e) {
            setGreska(e?.response?.data?.message || 'Nešto nije uredu');
        } finally {
            setLoading(false);
        }
    }

    return <Modal open={open}>
        <div className='sirovina-dodaj-uredi-naslov'>
            Promjena šifre
        </div>
        <div className='sirovina-dodaj-uredi-sadrzaj'>
            {loading ? <CircularProgress/> : <>
                <TextField type='password' size='small' label='Stara šifra' value={staraSifra} onChange={(e) => setStaraSifra(e.target.value)}/>
                <TextField type='password' size='small' label='Nova šifra' value={novaSifra} onChange={(e) => setNovaSifra(e.target.value)}/>
                <TextField type='password' size='small' label='Potvrda nove šifre' value={potvrdaNoveSifre} onChange={(e) => setPotvrdaNoveSifre(e.target.value)}/>
            </>}
            {!!greska && <Chip label={greska} color='error'/> }
        </div>
        <div className='sirovina-dodaj-uredi-footer'>
            <Button color='error' variant='contained' onClick={zatvori}>
                Zatvori
            </Button>
            <Button variant='contained' onClick={potvrdi}>
               Potvrdi
            </Button>
        </div>
    </Modal>;
}

export default PromijeniSifruModal;