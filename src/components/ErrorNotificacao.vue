<template lang="">
  <div>
    <ul class="erro" v-if="erros.length > 0">
      <li v-for="(erro, index) in erros" v-html="erro" :key="index"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ErroNotificacao",
  props: {
    erros: Array,
  },
  setup() {},
};
</script>
<style scoped>
.erro {
  margin: 20px auto;
  color: #e80;
  text-align: center;
}
</style>
