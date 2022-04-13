<template>
  <h3
    class="topbar_border_bottom pa-3 teal darken-2"
    style="color: white; font-weight: 400"
  >
    <v-icon dark style="mr-2"> mdi-blur </v-icon>
    {{ title }}
  </h3>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.topbar_border_bottom {
  border-bottom: solid 2px #000;
}
</style>
