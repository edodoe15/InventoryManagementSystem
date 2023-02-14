import './index.css';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import {IconButton} from "@mui/material";
import {useState} from "react";
import {deleteSirovina} from "../../api/sirovine";
import SirovinaBrisanjeModal from "../SirovinaBrisanjeModal";
import SirovinaDetaljiModal from "../SirovinaDetaljiModal";
import SirovinaDodajUrediModal from "../SirovinaDodajUrediModal";

const Sirovina = (
    {
        id,
        naziv,
        kolicina,
        min_kolicina,
        cijena,
        jedinica_mjere,
        da_li_se_koristi,
        dobavljac,
        obrisiSirovinuIzListe,
        dobavljaci,
        dohvatiSirovine
    }) => {
    const [detaljiOpen, setDetaljiOpen] = useState(false);
    const [brisanjeOpen, setBrisanjeOpen] = useState(false);
    const [uredjivanjeOpen, setUredjivanjeOpen] = useState(false);

    const potvrdiBrisanje = async () => {
        try {
            await deleteSirovina(id);
            obrisiSirovinuIzListe(id);
        } catch (e) {
            console.log(e);
        }
    }

    return <div className='sirovina'>
        <div className='sirovina-jib'>
            <div className='sirovina-jib-labela'>Dobavljač</div> &nbsp;
            {dobavljac?.naziv}
        </div>
        <div className='sirovina-sadrzaj'>
            <div>
                {naziv}
            </div>
            <div className='sirovina-akcije'>
                    <IconButton onClick={() => setDetaljiOpen(true)}>
                        <RemoveRedEye/>
                    </IconButton>
                    <IconButton>
                        <Edit onClick={() => setUredjivanjeOpen(true)}/>
                    </IconButton>
                    <IconButton>
                        <Delete onClick={() => {
                            setBrisanjeOpen(true);
                        }
                        }/>
                    </IconButton>
            </div>
        </div>
        <SirovinaDetaljiModal
            open={detaljiOpen}
            handleClose={() => setDetaljiOpen(false)}
            naziv={naziv}
            kolicina={kolicina}
            min_kolicina={min_kolicina}
            cijena={cijena}
            jedinica_mjere={jedinica_mjere}
            dobavljac={dobavljac}
            da_li_se_koristi={da_li_se_koristi}
        />
        <SirovinaBrisanjeModal
            open={brisanjeOpen}
            handleClose={() => setBrisanjeOpen(false)}
            potvrdiBrisanje={potvrdiBrisanje}
            sirovina={naziv}
        />
        <SirovinaDodajUrediModal
            open={uredjivanjeOpen}
            handleClose={() => setUredjivanjeOpen(false)}
            id={id}
            naziv={naziv}
            kolicina={kolicina}
            min_kolicina={min_kolicina}
            jedinica_mjere={jedinica_mjere}
            cijena={cijena}
            da_li_se_koristi={da_li_se_koristi}
            dobavljac={dobavljac}
            dobavljaci={dobavljaci}
            dohvatiSirovine={dohvatiSirovine}
        />
    </div>
}

export default Sirovina;