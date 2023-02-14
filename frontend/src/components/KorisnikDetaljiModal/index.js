import './index.css';
import {Button} from "@mui/material";
import Modal from "../Modal";
import dayjs from "dayjs";

const KorisnikDetaljiModal = (
    {
        open,
        handleClose,
        korisnicko_ime,
        uloga,
        ime,
        prezime,
        broj_telefona,
        adresa,
        email_adresa,
        datum_zaposlenja,
        datum_otkaza
    }
) => {
    return <Modal open={open}>
        <div className='korisnik-detalji-sadrzaj'>
                <span className='korisnik-detalji-sadrzaj-naslov'>
                    Detalji o korisniku
                </span>
            <div className='korisnik-detalji-sadrzaj-podaci'>
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Korisničko ime
                    </div>
                    <div>
                        {korisnicko_ime}
                    </div>
                </div>
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Uloga
                    </div>
                    <div>
                        {uloga}
                    </div>
                </div>
                {!!ime &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Ime
                    </div>
                    <div>
                        {ime}
                    </div>
                </div>
                }
                {!!prezime &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Prezime
                    </div>
                    <div>
                        {prezime}
                    </div>
                </div>
                }
                {!!broj_telefona &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Broj telefona
                    </div>
                    <div>
                        {broj_telefona}
                    </div>
                </div>
                }
                {!!adresa &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Adresa
                    </div>
                    <div>
                        {adresa}
                    </div>
                </div>
                }
                {!!email_adresa &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Email adresa
                    </div>
                    <div>
                        {email_adresa}
                    </div>
                </div>
                }
                {!!datum_zaposlenja &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Datum zaposlenja
                    </div>
                    <div>
                        {dayjs(datum_zaposlenja).format('DD/MM/YYYY')}
                    </div>
                </div>
                }
                {!!datum_otkaza &&
                <div className='korisnik-detalji-sadrzaj-podatak'>
                    <div className='korisnik-detalji-sadrzaj-podatak-naslov'>
                        Datum otkaza
                    </div>
                    <div>
                        {dayjs(datum_otkaza).format('DD/MM/YYYY')}
                    </div>
                </div>
                }
            </div>
        </div>
        <div className='korisnik-detalji-footer'>
            <Button color='error' variant='contained' onClick={handleClose}>
                Zatvori
            </Button>
        </div>
    </Modal>
};

export default KorisnikDetaljiModal;