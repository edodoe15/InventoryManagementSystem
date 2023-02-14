import './index.css';
import Modal from "../Modal";
import {Button} from "@mui/material";

const DobavljacBrisanjeModal = ({dobavljac, open, handleClose, potvrdiBrisanje}) => {
    return <Modal open={open} small={true}>
        <div className='dobavljac-brisanje-sadrzaj'>
            Da li ste sigurni da želite obrisati dobavljača <strong>{dobavljac}?</strong>
        </div>
        <div className='dobavljac-brisanje-footer'>
            <Button variant='contained' color='error' onClick={handleClose}>
                Ne
            </Button>
            <Button variant='contained' onClick={potvrdiBrisanje}>
                Da
            </Button>
        </div>
    </Modal>
}

export default DobavljacBrisanjeModal;