<template lang="">
  <section>
    <div v-if="vendas">
      <h2>vendas</h2>
      <div
        class="produtos-wrapper"
        v-for="(venda, index) in vendas"
        :key="index"
      >
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor">
            <span>Comprador: </span>
            {{ venda.comprador_id }}
          </p>
        </ProdutoItem>

        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(endereco, key) in venda.endereco" :key="key">
              <p>{{ key }}: {{ endereco }}</p>
            </li>
          </ul>
        </div>
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
  name: "UsuarioVendas",
  components: {
    ProdutoItem,
  },
  setup() {
    const store = useStore();
    const vendas = ref(null);
    const usuario = store.state.usuario.id;
    const login = store.state.login;

    const puxarvendas = () => {
      api.get(`/transacao?tipo=vendedor_id`).then((response) => {
        vendas.value = response.data;
      });
    };

    onMounted(() => {
      if (login) puxarvendas();
    });

    // watch(login, () => {
    //   puxarvendas();
    // });

    return {
      vendas,
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
.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}
</style>
