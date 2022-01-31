import { mapGetters } from 'vuex';
import ModalMessage from '~/components/ModalMessage';
import { swal } from '~/utils/alert';

export default {
  components: {
    ModalMessage
  },
  layout(context) {
    return 'clear'
  },
  data: () => ({
    formData: {
      email: process.env.NODE_ENV == 'development' ? 'diogo.franco85@gmail.com' : '',
      password: process.env.NODE_ENV == 'development' ? '150398' : '',
      flow: 'web'
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
    ],

    dialogStatus: false,
    dialogMessage: '',
    dialogType: 'error'
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

    user(value) {
      if (value) {
        this.$store.dispatch('Auth/GET_MENU', { idProfile: value.idProfile });
      }
    },

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          swal(this, value, 'error');
        } else {
          swal(this, value, 'success');
        }
      }
    }
  },

  mounted() {
    if (this.error === true) {
      swal(this, this.message, 'error');
    }
  },

  methods: {
    loginRequest() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch('Auth/GET_AUTHENTICATE', this.formData)
          .then(() => {
            console.log('profile', this.user);
            this.loading = false;
            this.$router.push('/home');
          });
      } else {
        this.loading = false;
      }
    },
  }
}
