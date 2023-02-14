import axios from "axios";
import {LOCAL_API} from "../constants";

export const getDobavljaci = () => axios.get(`${LOCAL_API}/dobavljaci`);

export const deleteDobavljac = (id) => axios.delete(`${LOCAL_API}/dobavljaci/${id}`);

export const postDobavljac = (data) => axios.post(`${LOCAL_API}/dobavljaci`, data);

export const patchDobavljac = (id, data) => axios.patch(`${LOCAL_API}/dobavljaci/${id}`, data);



