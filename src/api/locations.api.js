import axios from "axios";

const URL = "http://localhost:8000";

console.log(URL);
const ClientApi = axios.create({
  baseURL: `${URL}/backend/cliente/`,
});

export const getAllProvince = () => ClientApi.get("provincia/");

export const getAllCanton = () => ClientApi.get("canton/");

export const getAllDistrict = () => ClientApi.get("distrito/");

export const getAllNeighborhood = () => ClientApi.get("barrio/");

