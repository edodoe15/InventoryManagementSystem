import './index.css';
import {Button} from "@mui/material";
import Modal from "../Modal";

const SirovinaDetaljiModal = (
    {
        open,
        handleClose,
        naziv,
        kolicina,
        min_kolicina,
        cijena,
        jedinica_mjere,
        da_li_se_koristi,
        dobavljac,
    }
) => {
    return <Modal open={open}>
        <div className='sirovina-detalji-sadrzaj'>
                <span className='sirovina-detalji-sadrzaj-naslov'>
                    Detalji o sirovini
                </span>
            <div className='sirovina-detalji-sadrzaj-podaci'>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Naziv
                    </div>
                    <div>
                        {naziv}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Količina
                    </div>
                    <div>
                        {kolicina}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Minimalna količina
                    </div>
                    <div>
                        {min_kolicina}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Cijena
                    </div>
                    <div>
                        {cijena}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Jedinica mjere
                    </div>
                    <div>
                        {jedinica_mjere}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Da li se koristi
                    </div>
                    <div>
                        {da_li_se_koristi ? 'Da':'Ne'}
                    </div>
                </div>
                <div className='sirovina-detalji-sadrzaj-podatak'>
                    <div className='sirovina-detalji-sadrzaj-podatak-naslov'>
                        Dobavljač
                    </div>
                    <div>
                        {dobavljac?.naziv}
                    </div>
                </div>
            </div>
        </div>
        <div className='sirovina-detalji-footer'>
            <Button color='error' variant='contained' onClick={handleClose}>
                Zatvori
            </Button>
        </div>
    </Modal>
};

export default SirovinaDetaljiModal;