<template>
  <section>
    <h1>👍Compre ou Venda 👎</h1>
    <ProdutoBuscar />
    <ProdutoLista />
  </section>
</template>
<script>
import ProdutoLista from "../components/ProdutoLista.vue";
import ProdutoBuscar from "../components/ProdutoBuscar.vue";
export default { components: { ProdutoLista, ProdutoBuscar } };
</script>
<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  margin-top: 40px;
  text-align: center;
}
</style>
