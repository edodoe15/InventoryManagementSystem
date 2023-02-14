import './index.css';
import Modal from "../Modal";
import {Button} from "@mui/material";

const KorisnikBrisanjeModal = ({korisnik, open, handleClose, potvrdiBrisanje}) => {
    return <Modal open={open} small={true}>
        <div className='korisnik-brisanje-sadrzaj'>
            Da li ste sigurni da želite obrisati korisnika <strong>{korisnik}?</strong>
        </div>
        <div className='korisnik-brisanje-footer'>
            <Button variant='contained' color='error' onClick={handleClose}>
                Ne
            </Button>
            <Button variant='contained' onClick={potvrdiBrisanje}>
                Da
            </Button>
        </div>
    </Modal>
}

export default KorisnikBrisanjeModal;