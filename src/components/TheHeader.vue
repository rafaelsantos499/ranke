<template>
  <header>
    <nav>
      <router-link class="logo" to="/">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link class="btn" v-if="store.state.login" to="/usuario">{{
        nome
      }}</router-link>
      <router-link class="btn" to="/login" v-else> Vender / Login </router-link>
    </nav>
  </header>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "TheHeader",
  setup() {
    const store = useStore();
    // const nome = ref("");

    const nome = computed(() => {
      return store.state.usuario.nome.replace(/ .*/, "");
    });

    return {
      store,
      nome,
    };
  },
};
</script>
<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
