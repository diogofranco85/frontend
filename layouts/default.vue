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
            <v-icon color="cyan">{{ item.icon }}</v-icon>
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
      color="cyan darken-4"
      dark
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            @click.stop="miniVariant = !miniVariant"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon
              >mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon
            >
          </v-btn>
        </template>
        {{ `${miniVariant ? "Expandir Menu" : "Retrair Menu"}` }}
      </v-tooltip>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-on="on" v-bind="attrs">
            <v-icon>mdi-account</v-icon>
            <span>{{ NomeUsuario }}</span>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item router :to="'/users/account'" active-class="border">
            <v-icon class="mr-2" color="primary">mdi-account-circle</v-icon>
            <span>Meus dados</span>
          </v-list-item>
          <v-list-item router :to="'/logout'">
            <v-icon class="mr-2" color="primary">mdi-exit-to-app</v-icon>
            <span>Sair</span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      color="cyan darken-4"
      flat
      dark
      class="flex align-center justify-center"
    >
      <span class="text--white">
        Desenvolvido por <strong>Hype Tecnologia e Informatica </strong>&copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<style>
.swal-position-absolute {
  position: absolute;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      NomeUsuario: "",
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "HydroWater",
    };
  },

  mounted() {
    this.localUser();
  },

  computed: {
    ...mapGetters({
      items: "Auth/getMenu",
    }),
  },

  methods: {
    localUser() {
      const str = window.localStorage.getItem("user_profile");
      if (str) {
        const user = JSON.parse(str);
        this.NomeUsuario = user.name;
      }
    },

    account() {
      this.$router.push("/users/account");
    },
  },
};
</script>
