<template>
  <v-main class="">
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
              <validation-observer ref="formRef" v-slot="{ invalid }">
                <v-form @submit.prevent="loginRequest">
                  <validation-provider
                    vid="formData.email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="formData.email"
                      name="email"
                      label="Email de acesso"
                      type="text"
                      placeholder="digite seu e-mail"
                      required
                      :error-messages="errors"
                    />
                  </validation-provider>

                  <validation-provider
                    vid="formData.password"
                    rules="required|"
                    v-slot="{ errors }"
                  >
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
                      :error-messages="errors"
                    />
                  </validation-provider>
                  <v-btn
                    block
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    outlined
                    :disabled="invalid"
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
                </v-form>
              </validation-observer>
              <p class="mt-3 mb-3 text-center">
                <small>Hype Tecnologia e Informatica @ 2022</small>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script src="~/services/login/script.js"></script>
<style scoped="css" src="./styles.css"></style>
