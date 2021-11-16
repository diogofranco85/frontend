export default {
  middleware: ['auth'],

  mounted() {
    this.$swal.fire({
      type: 'info',
      title: 'Desconectado',
      text: 'Usuário desconectado com sucesso'
    })
    this.$store.dispatch('Auth/GET_LOGOUT');
    this.$router.push('/login');
  }
}
