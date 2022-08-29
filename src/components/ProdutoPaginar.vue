<template>
  <ul v-if="total > 1">
    <li v-for="pagina in total" :key="pagina">
      <router-link :to="{ query: { _page: pagina } }">{{ pagina }}</router-link>
    </li>
  </ul>
</template>
<script>
import { ref, computed } from "vue";

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

    const totalPagina = Math.ceil(
      props.produtosTotal / props.produtosPorPagina
    );

    total.value = total.value !== Infinity ? Math.ceil(totalPagina) : 0;

    return { total };
  },
};
</script>
<style>
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
