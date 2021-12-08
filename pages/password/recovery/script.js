import { post, put } from '~/utils/api';
export default {
  layout: 'blank',
  data: () => ({
    stepper: 1,
    email: '',
    securityCode: '',
    flow: 'recovery',
    password: '',
    passwordConfirmation: '',
    dialogStatus: false,
    dialogMessage: '',
    dialogType: 'error'
  }),

  methods: {
    actBack() {
      this.$router.push('/login');
    },

    dialogClose() {
      this.dialogStatus = false
    },

    openDialog(message, type) {
      this.dialogMessage = message;
      this.dialogType = type;
      this.dialogStatus = true;
    },

    async sendMail() {
      post('/token/create', { email: this.email }, 'SEM_TOKEN_JSON')
        .then(() => {
          this.stepper = 2;
        })
        .catch(err => {
          this.openDialog(err.response.data.message, 'error');
        })
    },

    sendValidadeCode() {
      const data = {
        email: this.email,
        securityCode: this.securityCode,
        flow: 'recovery'
      }
      post('/token/validate', data, 'SEM_TOKEN_JSON')
        .then(() => {
          this.stepper = 3;
        })
        .catch(err => {
          this.openDialog(err.response.data.message, 'error');
        })
    },

    updatePassword() {
      const data = {
        email: this.email,
        securityCode: this.securityCode,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      };

      put('/password/update', data, 'SEM_TOKEN_JSON')
        .then(() => {
          this.$swal.fire({
            title: 'Atualização de senha',
            text: 'Sua senha foi atualizada com sucesso',
            type: 'success'
          })

          this.$router.push('/login');
        })
        .catch(err => {
          this.openDialog(err.response.data.message, 'error');
        })
    }
  }
}
