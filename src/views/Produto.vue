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
        <p class="preco">
          {{ real(produto.preco) }}
        </p>
        <p class="descricao">{{ produto.descricao }}</p>
        <div v-if="produto.vendido === 'false'">
          <button class="btn">Comprar</button>
          <FinalizarCompra :produto="produto" />
        </div>
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
import FinalizarCompra from "../components/FinalizarCompra.vue";

export default {
  name: "Produto",
  props: ["id"],
  components: { PaginaCarregando, FinalizarCompra },

  setup(props) {
    const produto = ref();
    const finalizarCompradoUsuario = ref("false");

    function real(x) {
      return Number(x).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    }

    onMounted(() => {
      getProduto();
    });
    function getProduto() {
      api.get(`/produto/${props.id}`).then((response) => {
        produto.value = response.data;
      });
    }
    return { produto, finalizarCompradoUsuario, real };
  },
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
