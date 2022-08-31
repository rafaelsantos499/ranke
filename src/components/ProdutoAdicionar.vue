<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome" />
    <label for="preco">Preco (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco" />
    <label for="foto">Foto</label>
    <input type="file" name="foto" id="foto" v-on:change="fotos" />
    <label for="descricao">Descrição </label>
    <textarea
      name="descricao"
      id="descricao"
      v-model="produto.descricao"
    ></textarea>
    <input
      type="button"
      value="Adicionar Produto"
      class="btn"
      @click.prevent="AdicionarProduto"
    />
  </form>
</template>
<script>
import { api } from "../services";
import { useStore } from "vuex";

export default {
  name: "ProdutoAdicionar",
  setup() {
    const store = useStore();
    const produto = {
      usuario_id: "",
      nome: "",
      preco: "",
      descricao: "",
      fotos: null,
      vendido: "false",
    };

    const formataProduto = () => {
      produto.usuario_id = store.state.usuario.id;
    };

    const AdicionarProduto = async () => {
      formataProduto();
      await api.post("/produto", produto);
      await store.dispatch("getUsuarioProduto");
    };

    return {
      produto,
      AdicionarProduto,
    };
  },
};
</script>
<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
