<template>
  <section class="login">
    <h1>Login</h1>
    <form class="login">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />

      <button class="btn" @click.prevent="logar">logar</button>
      <ErrorNotificacao :erros="erros" />
      <p class="perdeu">
        <a
          href="http://ranek.local/wp-login.php?action=lostpassword"
          target="_blank"
          >Perdeu a senha? Clique aqui.
        </a>
      </p>
      <LoginCriar />
    </form>
  </section>
</template>
<script>
import { reactive, ref } from "vue";
import LoginCriar from "../components/LoginCriar.vue";
import { useStore } from "vuex";
import router from "../router";
import ErrorNotificacao from "../components/ErrorNotificacao.vue";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const login = reactive({
      email: "",
      senha: "",
    });
    const erros = ref([]);

    async function logar() {
      erros.value = [];
      try {
        await store.dispatch("logarUsuario", login);
        await store.dispatch("getUsuario");
        await router.push({ name: "usuario" });
      } catch (err) {
        erros.value.push(err.response.data.message);
      }

      // if (response) {
      // } else {
      //   alert("Não existe");
      // }

      // const response = store.dispatch("getUsuario");
    }

    return {
      login,
      logar,
      erros,
    };
  },
  components: { LoginCriar, ErrorNotificacao },
};
</script>
<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

.form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}
</style>
