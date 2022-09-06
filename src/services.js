import axios from "axios";

const axiosPadrao = axios.create({
  baseURL: "http://ranek.local/wp-json/api",
});

axiosPadrao.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosPadrao.get(endpoint);
  },
  post(endpoint, body) {
    return axiosPadrao.post(endpoint, body);
  },
  delete(endpoint) {
    return axiosPadrao.delete(endpoint);
  },
  put(endpoint, body) {
    return axiosPadrao.put(endpoint, body);
  },
  login(body) {
    return axios.post("http://ranek.local/wp-json/jwt-auth/v1/token", body);
  },
  validateToken() {
    return axiosPadrao.post(
      "http://ranek.local/wp-json/jwt-auth/v1/token/validate"
    );
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
