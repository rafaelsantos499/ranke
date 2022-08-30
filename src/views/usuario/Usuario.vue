<template>
  <div>{{ store.state.usuario }}</div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "usuario",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>
<style lang=""></style>
