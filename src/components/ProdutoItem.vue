<template>
  <div class="produto" v-if="produto">
    <router-link
      class="produto_img"
      :to="{ name: 'produto', params: { id: produto.id } }"
    >
      <img
        v-if="produto.fotos"
        :src="produto.fotos[0].src"
        :alt="produto.fotos[0].titulo"
      />
      <p>Ver Produto</p></router-link
    >
    <div class="info">
      <p>{{ produto.preco }}</p>
      <h2>{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProdutoItem",
  props: ["produto"],

  setup(props) {
    // console.log(props);
  },
};
</script>
<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.info {
  align-self: end;
}

.produto_img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
