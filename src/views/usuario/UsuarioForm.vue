<template>
  <form>
    <label for="nome">Nome</label>
    <input id="nome" type="text" name="nome" v-model="nome" />
    {{ nome }}
    <!-- <label for="email">Email</label>
    <input id="email" type="email" name="email" v-model="email" />
    <label for="senha">Senha</label>
    <input id="senha" type="password" name="senha" v-model="senha" />
    <label for="cep">Cep</label>
    <input id="cep" type="text" name="cep" v-model="cep" />
    <label for="rua">Rua</label>
    <input id="rua" type="text" name="rua" v-model="rua" />
    <label for="numero">Numero</label>
    <input id="numero" type="text" name="numero" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input id="bairro" type="text" name="bairro" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input id="cidade" type="text" name="cidade" v-model="cidade" />
    <label for="estado">Estado</label>
    <input id="estado" type="text" name="estado" v-model="estado" /> -->
    <div class="button">
      <slot> </slot>
    </div>
  </form>
</template>
<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "UsuarioForm",
  setup() {
    const store = useStore();
    const nome = ref("");

    onMounted(() => {});

    watch(nome, () => {
      set(nome.value);
      get();
    });

    function get() {
      return (nome.value = store.state.usuario.nome);
    }
    function set(value) {
      store.commit("UPDATE_USUARIO", { nome: value });
    }

    return {
      nome,
    };
  },
};
</script>
<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
