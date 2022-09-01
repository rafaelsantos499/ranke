<template>
  <section class="usuario">
    <nav class="sideNav">
      <ul>
        <li>
          <router-link :to="{ name: 'usuario' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'compras' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'vendas' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'usuario-editar' }"
            >Editar Usuário</router-link
          >
        </li>
        <li>
          <button @click.prevent="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </section>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../../router";

export default {
  name: "usuario",

  setup() {
    const store = useStore();
    const route = useRoute();

    const deslogar = async () => {
      await store.dispatch("deslogarUsuario");
      router.push({ name: "login" });
    };

    return {
      store,
      deslogar,
    };
  },
};
</script>
<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  gap: 30px;
  padding: 20px;
}

@media (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;

    margin: 0 auto;
  }
}
.sideNav a {
  padding: 10px;
  display: block;
  background-color: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sideNav a.router-link-exact-active,
.sideNav a:hover,
.sideNav button:hover {
  background-color: #87f;
  color: white;
}
.sideNav button {
  border: none;
  background-color: #f4f7fc;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  text-align: left;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
</style>
