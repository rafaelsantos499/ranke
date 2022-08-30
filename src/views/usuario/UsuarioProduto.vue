<template lang="">
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>

    <ul v-if="dataProduto">
      <li v-for="produto in dataProduto">
        <ProdutoItem :produto="produto">
          {{ produto.descricao }}
        </ProdutoItem>
      </li>
    </ul>

    <br />
    <!-- {{ usuario_produto }} -->
  </section>
</template>
<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import ProdutoAdicionar from "../../components/ProdutoAdicionar.vue";
import ProdutoItem from "../../components/ProdutoItem.vue";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoItem,
    ProdutoAdicionar,
  },
  setup() {
    const store = useStore();
    const dataProduto = ref();

    onMounted(async () => {
      if (store.state.login) {
        await store.dispatch("getUsuarioProduto");
        dataProduto.value = await store.state.produtos;
      }
    });

    // if (store.state.login) {

    // }

    // const usuario_produto = store.dispatch("getUsuarioProduto");

    //  mapActions(["getUsuarioProduto"]);

    // if (store.state.login) {
    // }

    return {
      dataProduto,
      store,
    };
  },
};
</script>
<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
