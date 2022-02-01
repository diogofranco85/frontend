<template>
  <v-app class="backimage">
    <nuxt />
  </v-app>
</template>

<style scoped>
.backimage {
  margin: 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: url("@/assets/bg_login.jpg");
  background-size: cover;
  background-blend-mode: darken;
}
</style>
