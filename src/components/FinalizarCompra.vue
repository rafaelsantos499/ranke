<template>
  <section>
    <h2 v-if="login">Endereço de Envio Comprar</h2>
    <h2 v-else>Crie sua conta primeiro.</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UsuarioForm>
  </section>
</template>
<script>
import { onMounted, ref } from "vue";
import { mapState, useStore } from "vuex";
import router from "../router";
import { api } from "../services";
import UsuarioForm from "../views/usuario/UsuarioForm.vue";
export default {
  name: "FinalizarCompra",
  components: { UsuarioForm },
  props: ["produto"],
  setup(props) {
    const store = useStore();
    const usuario = store.state.usuario;
    const produto = props.produto;
    const login = store.state.login;

    const finalizarCompra = () => {
      if (store.state.login) {
        criarTransacao();
        console.log("logado");
      } else {
        criarUsuario();
        console.log("usuario Criado");
      }
    };

    function criarTransacao() {
      const comprar = {
        comprador_id: store.state.usuario.id,
        vendedor_id: produto.usuario_id,
        produto: produto,
        endereco: {
          cep: store.state.usuario.cep,
          rua: store.state.usuario.rua,
          numero: store.state.usuario.numero,
          bairro: store.state.usuario.bairro,
          cidade: store.state.usuario.cidade,
          estado: store.state.usuario.estado,
        },
      };

      return api.post("/transacao", comprar).then(() => {
        router.push({ name: "compras" });
      });
    }

    async function criarUsuario() {
      try {
        await store.dispatch("criarUsuario", store.state.usuario);
        await store.dispatch("logarUsuario", store.state.usuario);
        await store.dispatch("getUsuario");
        criarTransacao();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      finalizarCompra,
      login,
    };
  },
};
</script>
<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn {
  background-color: #e80;
}
</style>
