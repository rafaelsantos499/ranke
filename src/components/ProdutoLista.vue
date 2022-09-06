<template>
  <section class="produto-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div
          class="produto"
          v-for="{ id, nome, preco, descricao, fotos } in produtos"
          :key="id"
        >
          <router-link :to="{ name: 'produto', params: { id: id } }">
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
      <div
        v-else-if="produtos && produtos.length === 0"
        key="sem-resultados"
        class="sem-resultados"
      >
        <p>Busca sem resultados. Temte buscar outro termo.</p>
      </div>

      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>

<script>
import { Transition, onMounted, ref, watch } from "vue";
import { api } from "@/services.js";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import ProdutoPaginar from "./ProdutoPaginar.vue";
import PaginaCarregando from "./PaginaCarregando.vue";
export default {
  name: "ProdutoLista",
  components: {
    ProdutoPaginar,
    PaginaCarregando,
    Transition,
  },
  setup() {
    const route = useRoute();
    const produtos = ref(null);

    const url = ref("");
    const produtosTotal = ref(0);
    const produtosPorPagina = ref(3);

    onMounted(() => {
      buscaProdutos(route);
    });

    onBeforeRouteUpdate((to, from) => {
      buscaProdutos(to);
    });

    function buscaProdutos(query) {
      produtos.value = null;
      let teste = query.fullPath
        ? "&" + query.fullPath.replace("/", "").replace("?", "")
        : "";

      const path = `/produto?_limit=${produtosPorPagina.value}${teste}`;

      api.get(path).then((response) => {
        produtosTotal.value = Number(response.headers["x-total-count"]);
        produtos.value = response.data;
      });
    }

    return {
      produtos,
      url,
      produtosTotal,
      produtosPorPagina,
      buscaProdutos,
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
