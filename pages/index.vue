<template>
  <v-overlay :value="true" color="blue-grey darken-4">
    <v-progress-circular
      indeterminate
      size="128"
    >
        <strong>
          Carregando ...
        </strong>

    </v-progress-circular>
  </v-overlay>
</template>
<script>
export  default {
  middleware: ['auth'],

  mounted() {
    const path = this.$route.path;
    if(path === '/'){
      this.$router.push('/home');
    }
  }
}
</script>
