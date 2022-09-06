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
      // state.usuario.id = state.usuario.email;
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

    getUsuario(context) {
      return api.get(`/usuario`).then((response) => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    logarUsuario(contex, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha,
        })
        .then((response) => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
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
      window.localStorage.removeItem("token");
      contex.commit("UPDATE_LOGIN", false);
    },
  },
});

export default store;
