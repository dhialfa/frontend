import axios from "axios";

const URL = "http://localhost:8000";

console.log(URL);
const CabysApi = axios.create({
  baseURL: `${URL}/backend/cliente/cabys`,
});

export const getAllCabys = () => CabysApi.get("/");

export const getCabys= (id) => CabysApi.get(`/${id}`);

export const createCabys = (cabys) => CabysApi.post("/", cabys);

export const updateCabys = (id, cabys) => CabysApi.put(`/${id}/`, cabys);

export const deleteCabys = (id) => CabysApi.delete(`/${id}`);