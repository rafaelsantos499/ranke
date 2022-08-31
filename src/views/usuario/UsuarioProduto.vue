<template lang="">
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>

    <ul v-if="dataProduto">
      <li v-for="produto in dataProduto">
        <ProdutoItem :produto="produto">
          {{ produto.descricao }}
          <button class="deletar" @click="deletarProduto(produto.id)">
            Deletar
          </button>
        </ProdutoItem>
      </li>
    </ul>
  </section>
</template>
<script>
import { useStore } from "vuex";
import { onMounted, ref, watch } from "vue";
import ProdutoAdicionar from "../../components/ProdutoAdicionar.vue";
import ProdutoItem from "../../components/ProdutoItem.vue";
import { api } from "../../services";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoItem,
    ProdutoAdicionar,
  },
  setup() {
    const store = useStore();
    const dataProduto = ref();
    const deletarProduto = (id) => {
      const confirmar = window.confirm("Deseja Remover esse produto?");

      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            store.dispatch("getUsuarioProduto");
            console.log("teste");
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    };

    watch(
      () => store.state.produtos,
      () => {
        dataProduto.value = store.state.produtos;
        console.log("teste");
      }
    );

    onMounted(async () => {
      if (store.state.login) {
        await store.dispatch("getUsuarioProduto");
        dataProduto.value = await store.state.produtos;
      }
    });

    return {
      deletarProduto,
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

.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
