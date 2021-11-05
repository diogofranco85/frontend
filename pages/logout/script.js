export default {
  middleware: ['auth'],

  mounted() {
    this.$store.dispatch('Auth/GET_LOGOUT');
    this.$router.push('/login');
  }
}
