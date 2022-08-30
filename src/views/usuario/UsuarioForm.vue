<template>
  <form>
    <label for="nome">Nome</label>
    <input id="nome" type="text" name="nome" v-model="nome" />
    <label for="email">Email</label>
    <input id="email" type="email" name="email" v-model="email" />
    <label for="senha">Senha</label>
    <input id="senha" type="password" name="senha" v-model="senha" />
    <label for="cep">Cep</label>
    <input
      id="cep"
      type="text"
      name="cep"
      v-model="cep"
      @keyup="preencherCep"
    />
    <label for="rua">Rua</label>
    <input id="rua" type="text" name="rua" v-model="rua" />
    <label for="numero">Numero</label>
    <input id="numero" type="text" name="numero" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input id="bairro" type="text" name="bairro" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input id="cidade" type="text" name="cidade" v-model="cidade" />
    <label for="estado">Estado</label>
    <input id="estado" type="text" name="estado" v-model="estado" />
    <div class="button">
      <slot> </slot>
    </div>
  </form>
</template>
<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { getCep } from "../../services";

export default {
  name: "UsuarioForm",
  setup() {
    const store = useStore();
    const nome = ref("");
    const email = ref("");
    const senha = ref("");
    const cep = ref("");
    const rua = ref("");
    const numero = ref("");
    const bairro = ref("");
    const cidade = ref("");
    const estado = ref("");

    const preencherCep = () => {
      const valueCep = cep.value.replace(/\D/g, "");
      if (valueCep.length === 8) {
        getCep(valueCep).then((response) => {
          rua.value = response.data.logradouro;
          bairro.value = response.data.bairro;
          estado.value = response.data.uf;
          cidade.value = response.data.localidade;
        });
      }
    };

    watch(nome, () => {
      set(nome.value, "nome");
      get("nome");
    });

    watch(email, () => {
      set(email.value, "email");
      get("email");
    });

    watch(senha, () => {
      set(senha.value, "senha");
      get("senha");
    });

    watch(cep, () => {
      set(cep.value, "cep");
      get("cep");
    });

    watch(rua, () => {
      set(rua.value, "rua");
      get("rua");
    });

    watch(numero, () => {
      set(numero.value, "numero");
      get("numero");
    });

    watch(bairro, () => {
      set(bairro.value, "bairro");
      get("bairro");
    });
    watch(cidade, () => {
      set(cidade.value, "cidade");
      get("cidade");
    });
    watch(estado, () => {
      set(estado.value, "estado");
      get("estado");
    });

    function get(teste) {
      return (teste = store.state.usuario[teste]);
    }

    function set(value, fild) {
      store.commit("UPDATE_USUARIO", { [fild]: value });
    }

    return {
      nome,
      email,
      senha,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      preencherCep,
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
