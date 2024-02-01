import axios from "axios";

const URL = "https://api.hacienda.go.cr/fe/ex";

const ExonerApi = axios.create({
  baseURL: URL,
});

export const getExonet = (documento) => ExonerApi.get(`?autorizacion=${documento}`);
