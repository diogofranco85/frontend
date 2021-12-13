import { mapGetters } from 'vuex';
import { get } from '~/utils/api';

export default {
  data: () => ({
    items: [
      { text: 'Home', to: "home", nuxt: true },
      { text: 'Meus dados', to: "/users/account", disabled: true },
    ],
    loading: false,
    account: {
      name: '',
      id: '',
      email: '',
      profile: ''
    }
  }),

  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    })
  },

  middleware: ['auth'],

  mounted() {
    this.account = this.user;
    get('/user', 'COM_TOKEN_USUARIO')
      .then(response => {
        this.account.profile = response.data.result.profileName;
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }

}
