<template>
  <v-flex>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      <p>
        <strong>
          Carregando ...
        </strong>
      </p>
    </v-overlay>
      <v-row justify="center" align="center">
          <v-col md="9" class="pa-0" >
              <div class="login-container-left">
                <img
                  :src="require('@/assets/bg_login.jpg')"
                  width="100%"
                  height="100%"
                  title="Hydrowatter"
                  alt="Hydrowatter"
                />
              </div>
          </v-col>
          <v-col md="3">
            <v-row justify="center" align="center" >
                <v-card min-width="100%" min-height="100vh" flat>
                  <v-toolbar-title class="cyan accent-4 white--text pa-3">
                    <h5 class="flex align-center justify-center">Conectar ao sistema</h5>
                  </v-toolbar-title>
                  <div class="ma-4">
                    <div class="ma-auto mx-auto d-flex justify-center">
                      <img
                        :src="require('@/assets/hydrowatter.jpg')"
                        alt="HydroWatter"
                        title="HydroWatter"
                      ></img>
                    </div>
                    <v-form v-model="valid" ref="form">
                      <v-text-field
                        label="E-mail de acesso"
                        v-model="formData.email"
                        id="username"
                        :rules="emailRules"
                        outlined
                      ></v-text-field>

                      <v-text-field
                        label="Senha de acesso"
                        v-model="formData.password"
                        id="password"
                        min="6"
                        :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        outlined
                      ></v-text-field>

                      <v-btn
                        outlined
                        block
                        large
                        color="teal darken-3 teal--text"
                        @click="loginRequest"
                      >
                        Entrar
                      </v-btn>
                      <div class="d-flex align-center justify-center pa-4">
                        <nuxt-link to="/password/recovery" class="text--darken-3">Recuperar senha</nuxt-link>
                      </div>

                    </v-form>
                  </div>
                </v-card>
            </v-row>
          </v-col>
      </v-row>
      <ModalMessage
        :open="dialogStatus"
        :message="dialogMessage"
        :close="dialogClose"
        :type="dialogType"
      />
  </v-flex>
</template>

<script src="./script.js"></script>
<style scoped="css" src="./styles.css"></style>
