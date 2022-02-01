<template>
  <v-content class="">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm4 md3>
          <v-card class="elevation-12">
            <v-card-text>
              <v-flex>
                <v-row align="center" justify="center">
                  <img
                    :src="require('@/assets/hydrowatter.jpg')"
                    alt="HydroWatter"
                    title="HydroWatter"
                  />
                </v-row>
              </v-flex>
              <h4 class="mt-2 mb-4">Entrar no sistema</h4>
              <v-form v-model="valid" ref="form" @submit.prevent="loginRequest">
                <v-text-field
                  v-model="formData.email"
                  name="email"
                  label="Email de acesso"
                  type="text"
                  placeholder="digite seu e-mail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  name="password"
                  label="Senha de acesso"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  placeholder="digite sua senha"
                  counter
                  required
                ></v-text-field>
                <v-btn
                  block
                  type="submit"
                  class="mt-4"
                  color="primary"
                  value="log in"
                  outlined
                  >Conectar</v-btn
                >
                <v-btn
                  to="/password/recovery"
                  color="red accent-3"
                  block
                  dark
                  class="mt-2"
                  outlined
                >
                  Recuperar senha
                </v-btn>
                <!-- <div class="d-flex align-center justify-center pa-4">
                  <nuxt-link to="/password/recovery" class="text--darken-3"
                    >Recuperar senha</nuxt-link
                  >
                </div> -->
              </v-form>
              <p class="mt-3 mb-3 text-center">
                <small>Hype Tecnologia e Informatica @ 2022</small>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script src="~/services/login/script.js"></script>
<style scoped="css" src="./styles.css"></style>
