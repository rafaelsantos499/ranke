<template lang="">
  <section>
    <ErrorNotificacao :erros="erros" />
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
import ErrorNotificacao from "../../components/ErrorNotificacao.vue";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
    ErrorNotificacao,
  },
  setup() {
    const store = useStore();
    const erros = ref([]);
    const atualizarUsuario = () => {
      api
        .put(`/usuario`, store.state.usuario)
        .then(() => {
          store.dispatch("getUsuario");
          router.push({ name: "usuario" });
        })
        .catch((error) => {});
    };

    return {
      atualizarUsuario,
      erros,
    };
  },
};
</script>
<style lang=""></style>
