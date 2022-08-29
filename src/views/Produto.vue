<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="({ fotos }, index) in produto" :key="index">
          <img :src="fotos.src" :alt="fotos.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ produto.preco | preco }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <button v-if="produto.vendido === 'false'" class="btn">Comprar</button>
        <button v-else class="btn" disabled>Produto Vendindo</button>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { api } from "../services";
import PaginaCarregando from "../components/PaginaCarregando.vue";

export default {
  name: "pPoduto",
  props: ["id"],
  setup(props) {
    const produto = ref();
    onMounted(() => {
      getProduto();
    });
    function getProduto() {
      api.get(`/produto/${props.id}`).then((response) => {
        produto.value = response.data;
      });
    }
    return { produto };
  },
  components: { PaginaCarregando },
};
</script>
<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}
.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}
.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
