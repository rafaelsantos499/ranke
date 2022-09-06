<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
    <UsuarioForm v-else>
      <button class="btn btn-form" @click.prevent="criarUsuario">
        Criar Usuário
      </button>
    </UsuarioForm>
  </section>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../router";

import UsuarioForm from "../views/usuario/UsuarioForm.vue";
export default {
  name: "LoginCriar",
  setup() {
    const route = useRoute();
    const store = useStore();
    const criar = ref(false);

    const criarUsuario = async () => {
      try {
        await store.dispatch("criarUsuario", store.state.usuario);
        await store.dispatch("logarUsuario", store.state.usuario);
        await store.dispatch("getUsuario");
        router.push("/usuario");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      criar,
      criarUsuario,
    };
  },
  components: { UsuarioForm },
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
