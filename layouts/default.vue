<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="cyan accent-4"
      class="text--white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="clipped = !clipped"-->
<!--      >-->
<!--        <v-icon>mdi-application</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="fixed = !fixed"-->
<!--      >-->
<!--        <v-icon>mdi-minus</v-icon>-->
<!--      </v-btn>-->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip
        bottom
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon dense >
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <span>Meu dados</span>
      </v-tooltip>
      <v-tooltip
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            @click.stop="$router.push('/logout')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-login-variant</v-icon>
          </v-btn>
        </template>
        <span>Sair do sistema</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      color="blue-grey lighten-1"

    >
      <span class="text--white">Hype Tecnologia e Informatica &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data () {
    return {
      NomeUsuario: '',
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Clientes',
          to: '/clients'
        },
        {
          icon: 'mdi-table-check',
          title: 'Períodos',
          to: '/time_course'
        },
        {
          icon: 'mdi-account-circle',
          title: 'Usuários',
          to: '/users'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'HydroWatter'
    }
  },

  mounted() {
    this.localUser();
  },

  methods: {
    localUser(){
      const str = window.localStorage.getItem('user_profile');
      if(str){
        const user = JSON.parse(str);
        this.NomeUsuario = user.name;
      }
    }
  }

}
</script>
