<template>
  <ul v-if="total > 1">
    <li v-for="pagina in paginaArrayFinal" :key="pagina">
      <router-link :to="{ query: { _page: pagina } }" exact>{{
        pagina
      }}</router-link>
    </li>
  </ul>
</template>
<script>
import { computed } from "@vue/reactivity";
import { ref, onMounted, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import router from "../router";

export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const total = ref(0);
    const paginaArrayFinal = ref();

    const totalPagina = Math.ceil(
      props.produtosTotal / props.produtosPorPagina
    );

    total.value = total.value !== Infinity ? Math.ceil(totalPagina) : 0;

    onBeforeRouteUpdate(() => {
      paginas();
    });

    function paginas() {
      const current = Number(router.currentRoute.value.query._page);
      const range = 9;
      const offSet = Math.ceil(range / 2);
      const total = totalPagina;

      const pageArray = [];

      for (let i = 1; i <= total; i++) {
        pageArray.push(i);
      }

      pageArray.splice(0, current - offSet);
      pageArray.splice(range, total);

      paginaArrayFinal.value = pageArray;

      return pageArray;
    }

    paginaArrayFinal.value = paginas();

    return { total, paginaArrayFinal };
  },
};
</script>
<style scoped>
ul {
  grid-column: 1 / -1;
}
li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active {
  background: #87f;
  color: #fff;
}
</style>
