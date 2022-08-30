import axios from "axios";

const axiosPadrao = axios.create({
  baseURL: "http://localhost:3000",
});

export const api = {
  get(endpoint) {
    return axiosPadrao.get(endpoint);
  },
  post(endpoint, body) {
    return axiosPadrao.post(endpoint, body);
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
