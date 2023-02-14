import axios from "axios";
import {LOCAL_API} from "../constants";

export const getKorisnici = () => axios.get(`${LOCAL_API}/korisnici`);

export const deleteKorisnik = (id) => axios.delete(`${LOCAL_API}/korisnici/${id}`);

export const postAdmin = (data) => axios.post(`${LOCAL_API}/korisnici/admin`, data);

export const postZaposlenik = (data) => axios.post(`${LOCAL_API}/korisnici/zaposlenik`, data);

export const patchAdmin = (id, data) => axios.patch(`${LOCAL_API}/korisnici/admin/${id}`, data);

export const patchZaposlenik = (id, data) => axios.patch(`${LOCAL_API}/korisnici/zaposlenik/${id}`, data);