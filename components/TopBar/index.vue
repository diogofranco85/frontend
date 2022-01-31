<template>
  <h3 class="topbar_border_bottom pa-3 grey lighten-2 text--grey">
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
