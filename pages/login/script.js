import { mapGetters } from 'vuex';

export default {
  layout: 'blank',
  data: () => ({
    formData: {
      email: process.env.NODE_ENV == 'development' ? 'diogo.franco85@gmail.com' : '',
      password: process.env.NODE_ENV == 'development' ? '150398' : ''
    },
    valid: true,
    e1: true,
    loading: false,
    passwordRules: [
      (v) => !!v || 'Campo Senha é obrigatório',
    ],
    emailRules: [
      (v) => !!v || 'Campo E-mail é obrigatório',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Endereço de e-mail não é válido'
    ]
  }),

  computed: {
    ...mapGetters({
      'auth': 'Auth/getAuth',
      'user': 'Auth/getUser',
      'message': 'Auth/getMessage',
      'error': 'Auth/getError'
    })
  },

  watch: {
    auth(value) {
      if (value === true) {
        this.$router.push({ name: 'home' });
      }
    },

    error(value) {
      if (value == true) {
        this.$swal.fire({
          type: 'error',
          title: 'Falha no login',
          text: this.message
        })
      }
    }
  },

  mounted() {
    if (this.error === true) {
      this.$swal.fire({
        type: 'error',
        title: 'Falha no login',
        text: this.message
      })
    }
  },

  methods: {
    loginRequest() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch('Auth/GET_AUTHENTICATE', this.formData)
          .then(() => {
            this.loading = false;
            this.$router.push('/home');
          });
      } else {
        this.loading = false;
      }
    }
  }
}
