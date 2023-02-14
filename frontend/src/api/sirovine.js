import axios from "axios";
import {LOCAL_API} from "../constants";

export const getSirovine = () => axios.get(`${LOCAL_API}/sirovine`);

export const deleteSirovina = (id) => axios.delete(`${LOCAL_API}/sirovine/${id}`);

export const postSirovina = (data) => axios.post(`${LOCAL_API}/sirovine`, data);

export const patchSirovina = (id, data) => axios.patch(`${LOCAL_API}/sirovine/${id}`, data);



