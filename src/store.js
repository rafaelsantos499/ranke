import { createStore } from "vuex";
import { api } from "./services";

const store = createStore({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    produtos: null,
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload);
      state.usuario.id = state.usuario.email;
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario.produtos.unshit(payload);
    },
  },
  actions: {
    getUsuarioProduto(context) {
      return new Promise((resolve, reject) => {
        api
          .get(`/produto?usuario_id=${context.state.usuario.id}`)
          .then((response) => {
            context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
            resolve(true);
          });
      });
    },

    getUsuario(context, payload) {
      return new Promise((resolve, reject) => {
        api
          .get(`/usuario/${payload}`)
          .then((response) => {
            context.commit("UPDATE_USUARIO", response.data);
            context.commit("UPDATE_LOGIN", true);
            resolve(true);
          })
          .catch((e) => {
            resolve(false);
          });
      });
    },
    criarUsuario(context, payload) {
      console.log(payload);
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    deslogarUsuario(contex) {
      contex.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      contex.commit("UPDATE_LOGIN", false);
    },
  },
});

export default store;
