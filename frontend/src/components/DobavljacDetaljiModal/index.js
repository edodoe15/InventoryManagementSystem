import './index.css';
import {Button} from "@mui/material";
import Modal from "../Modal";
import dayjs from "dayjs";

const DobavljacDetaljiModal = (
    {
        open,
        handleClose,
        naziv,
        jib,
        pdv,
        broj_telefona,
        kontakt_osoba,
        email_adresa,
        datum_pocetka,
        datum_zavrsetka
    }
) => {
    return <Modal open={open}>
        <div className='dobavljac-detalji-sadrzaj'>
                <span className='dobavljac-detalji-sadrzaj-naslov'>
                    Detalji o korisniku
                </span>
            <div className='dobavljac-detalji-sadrzaj-podaci'>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Naziv
                    </div>
                    <div>
                        {naziv}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        JIB
                    </div>
                    <div>
                        {jib}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        PDV
                    </div>
                    <div>
                        {pdv}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Broj telefona
                    </div>
                    <div>
                        {broj_telefona}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Kontakt osoba
                    </div>
                    <div>
                        {kontakt_osoba}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Email adresa
                    </div>
                    <div>
                        {email_adresa}
                    </div>
                </div>
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Datum početka
                    </div>
                    <div>
                        {dayjs(datum_pocetka).format('DD/MM/YYYY')}
                    </div>
                </div>
                {!!datum_zavrsetka &&
                <div className='dobavljac-detalji-sadrzaj-podatak'>
                    <div className='dobavljac-detalji-sadrzaj-podatak-naslov'>
                        Datum završetka
                    </div>
                    <div>
                        {dayjs(datum_zavrsetka).format('DD/MM/YYYY')}
                    </div>
                </div>
                }
            </div>
        </div>
        <div className='dobavljac-detalji-footer'>
            <Button color='error' variant='contained' onClick={handleClose}>
                Zatvori
            </Button>
        </div>
    </Modal>
};

export default DobavljacDetaljiModal;