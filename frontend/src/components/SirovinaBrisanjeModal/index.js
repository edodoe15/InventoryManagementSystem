import './index.css';
import Modal from "../Modal";
import {Button} from "@mui/material";

const SirovinaBrisanjeModal = ({sirovina, open, handleClose, potvrdiBrisanje}) => {
    return <Modal open={open} small={true}>
        <div className='sirovina-brisanje-sadrzaj'>
            Da li ste sigurni da želite obrisati sirovinu <strong>{sirovina}?</strong>
        </div>
        <div className='sirovina-brisanje-footer'>
            <Button variant='contained' color='error' onClick={handleClose}>
                Ne
            </Button>
            <Button variant='contained' onClick={potvrdiBrisanje}>
                Da
            </Button>
        </div>
    </Modal>
}

export default SirovinaBrisanjeModal;