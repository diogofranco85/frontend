<template>
  <v-app dark>
    <TopBar title="Error encontrado" />
    <v-container class="ma-4">
      <v-card outlined class="ma-4">
        <v-system-bar height="30" window color="cyan accent-4" dark>
          <h3>Log</h3>
        </v-system-bar>
        <div class="ma-4 pa-4">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <NuxtLink to="/"> Home page </NuxtLink>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 - Não Localizado",
      otherError: "Houve um error no sistema",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
