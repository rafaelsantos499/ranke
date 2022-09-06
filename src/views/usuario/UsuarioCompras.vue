<template lang="">
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        class="produtos-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor: </span>
            {{ compra.produto.usuario_id }}
          </p>
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>
<script>
import { onMounted, ref } from "vue";
import ProdutoItem from "../../components/ProdutoItem.vue";
import { api } from "../../services";
import { useStore } from "vuex";

export default {
  name: "UsuarioCompra",
  components: {
    ProdutoItem,
  },
  setup() {
    const store = useStore();
    const compras = ref(null);
    const usuario = store.state.usuario.id;
    const login = store.state.login;

    const puxarCompras = () => {
      api.get(`/transacao?tipo=comprador_id`).then((response) => {
        compras.value = response.data;
      });
    };

    onMounted(() => {
      if (login) puxarCompras();
    });

    // watch(login, () => {
    //   puxarCompras();
    // });

    return {
      compras,
    };
  },
};
</script>
<style scoped>
.produtos-wrapper {
  margin-bottom: 50px;
}
.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
