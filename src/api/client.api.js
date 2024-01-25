import axios from "axios";

const URL = "http://localhost:8000";

console.log(URL);
const ClientApi = axios.create({
  baseURL: `${URL}/backend/cliente/`,
});

export const getAllClient = () => ClientApi.get("/");

export const getClient= (id) => ClientApi.get(`/${id}`);

export const createClient = (client) => ClientApi.post("/", client);

export const updateClient = (id, client) => ClientApi.put(`/${id}/`, client);

export const deleteClient= (id) => ClientApi.delete(`/${id}`);