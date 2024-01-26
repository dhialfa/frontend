import axios from "axios";

const URL = "https://api.hacienda.go.cr/fe/ae";

const CedulaApi = axios.create({
  baseURL: URL,
});

export const getCedula = (cedula) => CedulaApi.get(`/?identificacion=${cedula}`);
