<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome" />
    <label for="preco">Preco (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco" />
    <label for="foto">Foto</label>
    <input type="file" name="foto" id="foto" multiple @change="fotos" />
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
import { ref } from "vue";

export default {
  name: "ProdutoAdicionar",
  setup() {
    const store = useStore();
    const files = ref(null);

    const produto = {
      usuario_id: "",
      nome: "",
      preco: "",
      descricao: "",
      fotos: null,
      vendido: "false",
    };

    function fotos(e) {
      files.value = e.target.files;
    }

    const formataProduto = () => {
      const form = new FormData();
      const fotos = files.value;

      for (let i = 0; i < fotos.length; i++) {
        form.append(fotos[i].name, fotos[i]);
      }

      form.append("nome", produto.nome);
      form.append("preco", produto.preco);
      form.append("descricao", produto.descricao);
      form.append("vendido", produto.vendido);
      form.append("usuario_id", (produto.usuario_id = store.state.usuario.id));

      return form;
    };

    const AdicionarProduto = async () => {
      const produto = formataProduto();
      formataProduto();
      await api.post("/produto", produto);
      await store.dispatch("getUsuarioProduto");
    };

    return {
      produto,
      AdicionarProduto,
      fotos,
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
