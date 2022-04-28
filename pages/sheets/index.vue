<template>
  <v-overlay :value="true">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <p>
      <strong> Carregando planilha... </strong>
    </p>
  </v-overlay>
</template>

<script>
export default {
  created() {
    this.$router.push("/sheets/flow");
  },
};
</script>
