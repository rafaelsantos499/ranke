<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="({ src }, index) in produto.fotos" :key="index">
          <img :src="src" alt="" />
        </li>
      </ul>

      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">
          {{ real(produto.preco) }}
        </p>
        <p class="descricao">{{ produto.descricao }}</p>
        <div v-if="produto.vendido === 'false'">
          <button class="btn" v-if="comprar" @click="comprar = false">
            Comprar
          </button>
          <FinalizarCompra v-else :produto="produto" />
        </div>
        <button v-else class="btn btn-disabled" disabled>
          Produto Vendindo
        </button>
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
    const comprar = ref(true);
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
    return { produto, finalizarCompradoUsuario, real, comprar };
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
.fotos {
  grid-row: 1/ 3;
}

.info {
  position: sticky;
  top: 20px;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}
.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
