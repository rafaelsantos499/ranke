import axios from "axios";

const axiosPadrao = axios.create({
  baseURL: "http://localhost:3000",
});

export const api = {
  get(endpint) {
    return axiosPadrao.get(endpint);
  },
};
