<template lang="">
  <section class="produto-container">
    {{ produtosTotal }}
    <div v-if="produtos && produtos.length" class="produtos">
      <div
        class="produto"
        v-for="{ id, nome, preco, descricao, fotos } in produtos"
        :key="id"
      >
        <router-link to="/">
          <img v-if="fotos" :src="fotos[0].src" :alt="fotos[0].titulo" />
          <p class="preco">{{ preco }}</p>
          <h2 class="titulo">{{ nome }}</h2>
          <p class="descricao">{{ descricao }}</p>
        </router-link>
      </div>
      <ProdutoPaginar
        :produtosTotal="produtosTotal"
        :produtosPorPagina="produtosPorPagina"
      />
    </div>
    <div v-else-if="produtos && produtos.length === 0" class="sem-resultados">
      <p>Busca sem resultados. Temte buscar outro termo.</p>
    </div>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import { api } from "@/services.js";
import router from "../router";
import ProdutoPaginar from "./ProdutoPaginar.vue";
export default {
  name: "ProdutoLista",
  components: {
    ProdutoPaginar,
  },
  setup() {
    const produtos = ref(null);

    const url = ref("");
    const produtosTotal = ref(0);
    const produtosPorPagina = ref(9);

    router.afterEach(async (to, from) => {
      let teste = "";
      teste = "&" + to.fullPath.replace("/", "").replace("?", "");

      return (url.value = `/produto?_limit=${produtosPorPagina.value}` + teste);
    });

    watch(url, (novovalor, antigovalor) => {
      api.get(novovalor).then((response) => {
        produtosTotal.value = Number(response.headers["x-total-count"]);
        produtos.value = response.data;
      });
    });

    return {
      produtos,
      url,
      produtosTotal,
      produtosPorPagina,
    };
  },
};
</script>
<style scoped>
.produto-container {
  max-width: 1000px;
  margin: 0 auto;
}
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 20px;
}

.preco {
  font-weight: bold;
  color: #e80;
}

.sem-resultados {
  text-align: center;
}
</style>
