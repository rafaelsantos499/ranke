<template lang="">
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuario
      </button>
    </UsuarioForm>
  </section>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../../router";
import { api } from "../../services";
import UsuarioForm from "./UsuarioForm.vue";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  setup() {
    const store = useStore();
    const atualizarUsuario = () => {
      api
        .put(`/usuario/${store.state.usuario.id}`, store.state.usuario)
        .then(() => {
          // store.commit("UPDATE_USUARIO", store.state.usuario);
          store.dispatch("getUsuario");
          router.push({ name: "usuario" });
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    return {
      atualizarUsuario,
    };
  },
};
</script>
<style lang=""></style>
