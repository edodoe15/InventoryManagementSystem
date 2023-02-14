import './index.css';
import {Button, Chip, CircularProgress, TextField} from '@mui/material';
import {useState} from "react";
import {postLogin} from "../../api/auth";
import {saveLoginData, getLoggedData} from "../../utils/localStorage";
import {Navigate} from 'react-router-dom';

const Login = () => {
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [sifra, setSifra] = useState('');
    const [greska, setGreska] = useState('');
    const [loading, setLoading] = useState(false);

    const klikniPrijaviSe = async () => {
        try {
            setLoading(true);
            const { data } = await postLogin({ korisnicko_ime: korisnickoIme, sifra });
            saveLoginData(data);
        } catch (e) {
            setGreska(e?.response?.data?.message || 'Nešto nije uredu');
        } finally {
            setLoading(false);
        }
    }

    const korisnik = getLoggedData();
    if(!!korisnik) {
        const { uloga } = korisnik;
        if(uloga === 'admin') return <Navigate to='/admin'/>;
        return <Navigate to='/zaposlenik'/>;
    }

    return <div className='login'>
        <span className='login-naslov'>Sistem za upravljanje zalihama</span>
        <div className='login-forma'>
            {loading ? <CircularProgress/> :
                <>
                    <TextField value={korisnickoIme} onChange={(e) => setKorisnickoIme(e.target.value)} label='Korisničko ime' variant='outlined'/>
                    <TextField value={sifra} onChange={(e) => setSifra(e.target.value)} label='Šifra' variant='outlined' type='password'/>
                    {!!greska && <Chip label={greska} color='error'/> }
                    <Button onClick={klikniPrijaviSe} variant='contained'>Prijavi se</Button>
                </>
            }
        </div>
    </div>
}

export default Login;