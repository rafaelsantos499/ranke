<template lang="">
  <form>
    <input
      name="busca"
      id="busca"
      type="text"
      v-model="busca"
      placeholder="Buscar..."
    />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProduto"
    />
  </form>
</template>
<script>
import { onMounted, ref } from "vue";
import router from "../router";

export default {
  name: "ProdutoBuscar",
  setup() {
    const busca = ref("");

    const buscarProduto = () => {
      router.push({ query: { q: busca.value } });
    };
    return { busca, buscarProduto };
  },
};
</script>
<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#busca {
  width: 100%;
  padding: 20px;

  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;

  top: 0;
  right: 0;
  box-shadow: none;
}
</style>
