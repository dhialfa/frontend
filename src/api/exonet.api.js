import axios from "axios";

const URL = "http://localhost:8000";

console.log(URL);
const ExonetApi = axios.create({
  baseURL: `${URL}/backend/cliente/exoneracion`,
});

export const getAllExonet = () => ExonetApi.get("/");

export const getExonet= (id) => ExonetApi.get(`/${id}`);

export const createExonet = (exonet) => ExonetApi.post("/", exonet);

export const updateExonet = (id, exonet) => ExonetApi.put(`/${id}/`, exonet);

export const deleteExonet= (id) => ExonetApi.delete(`/${id}`);