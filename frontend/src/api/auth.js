import axios from "axios";
import {LOCAL_API} from "../constants";

export const postLogin = (data) => axios.post(`${LOCAL_API}/auth/login`, data);

export const patchPromijeniSifru = (id, data) => axios.patch(`${LOCAL_API}/auth/password-change/${id}`, data);