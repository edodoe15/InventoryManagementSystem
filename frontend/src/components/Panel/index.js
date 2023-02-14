import './index.css';
import {Button, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {getLoggedData, removeLoginData} from "../../utils/localStorage";
import {Navigate, useNavigate} from 'react-router-dom';
import KorisniciTab from "../KorisniciTab";
import {ADMIN_ROUTES, ZAPOSLENIK_ROUTES} from "../../constants";
import DobavljaciTab from "../DobavljaciTab";
import SirovineTab from "../SirovineTab";
import PromijeniSifruModal from "../PromijeniSifruModal";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [promjenaSifreOpen, setPromjenaSifreOpen] = useState(false);

    const klikniOdjaviSe = () => {
        removeLoginData();
        navigate('/login');
    }

    const renderAdminTabs = () => {
        switch (tab) {
            case 0:
                return <KorisniciTab/>;
            case 1:
                return <DobavljaciTab/>;
            case 2:
                return <SirovineTab/>;
            default:
                return null;
        }
    }

    const renderZaposlenikTabs = () => {
        switch (tab) {
            case 0:
                return <DobavljaciTab/>;
            case 1:
                return <SirovineTab/>;
            default:
                return null;
        }
    }

    const korisnik = getLoggedData();
    if(!!korisnik) {
        if(korisnik.uloga === 'admin' && !ADMIN_ROUTES.includes(window.location.pathname) ) return <Navigate to='/admin'/>;
        if(korisnik.uloga === 'zaposlenik' && !ZAPOSLENIK_ROUTES.includes(window.location.pathname) ) return <Navigate to='/zaposlenik'/>;
    } else {
        return <Navigate to='/login'/>;
    }

    return <div className='admin-panel'>
        <div className='admin-panel-naslov'>
            <span>ADMIN PANEL | Sistem za upravljanje zalihama</span>
            <div className='admin-panel-opcije'>
                <Button onClick={() => setPromjenaSifreOpen(true)} variant='contained'>Promijeni šifru</Button>
                <Button onClick={klikniOdjaviSe} variant='contained' color='error'>Odjavi se</Button>
            </div>
        </div>
        <div className='admin-panel-tabovi'>
            <Tabs value={tab} onChange={(e, value) => setTab(value)}>
                {korisnik.uloga === 'admin' && <Tab label='Korisnici'/>}
                <Tab label='Dobavljači'/>
                <Tab label='Sirovine'/>
            </Tabs>
            {korisnik.uloga === 'admin' ? renderAdminTabs() : renderZaposlenikTabs()}
        </div>
        <PromijeniSifruModal open={promjenaSifreOpen} handleClose={() => setPromjenaSifreOpen(false)} id={korisnik?._id}/>
    </div>;
}

export default AdminPanel;