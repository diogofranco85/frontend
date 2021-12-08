<template>
  <div>
    <h3 class="topbar_border_bottom pa-3 cyan accent-4 text--grey">
      <v-btn icon @click="actBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span>HydroWatter</span>
    </h3>
    <TopBar title="Recuperar senha" />
    <v-container class="ma-4">
      <v-stepper v-model="stepper" outlined vertical>
        <v-stepper-header>
          <v-stepper-step step="1" :complete="stepper > 1">
            Verificar email
          </v-stepper-step>
          <v-divider />
          <v-stepper-step step="2" :complete="stepper > 2">
            Enviar código
          </v-stepper-step>
          <v-divider />
          <v-stepper-step step="3" :complete="stepper > 3">
            Alterar senha
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card outlined>
              <v-flex>
                <v-row align="center" justify="center">
                  <v-col md="2">
                    <v-icon color="cyan" size="128"> mdi-email-check </v-icon>
                  </v-col>
                  <v-col md="6" offset="3" class="ma-3">
                    <h2 class="ma-3">Digite seu email cadastrado no sistema</h2>
                    <p class="mx-3">
                      Para alterar a senha entre com seu email e clique em
                      continuar. Será enviado um código de validação para o seu
                      email
                    </p>
                    <v-text-field
                      name="email"
                      v-model="email"
                      label="Email cadastrado"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row align="center" justify="center" class="ma-1">
                  <v-col md="2">
                    <v-btn color="green" block dark outlined @click="sendMail">
                      Continuar
                      <v-icon> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-flex>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card outlined>
              <v-flex>
                <v-row align="center" justify="center">
                  <v-col md="2">
                    <v-icon color="cyan" size="128"> mdi-security </v-icon>
                  </v-col>
                  <v-col md="6" offset="3" class="ma-2">
                    <h2 class="ma-3">Código de verificação</h2>
                    <p class="mx-3">
                      Informe abaixo o código enviado para o seu e-mail
                    </p>
                    <v-otp-input
                      length="6"
                      v-model="securityCode"
                      type="number"
                      @finish="sendValidadeCode"
                    />
                  </v-col>
                </v-row>
                <v-row align="center" justify="center" class="ma-1">
                  <v-col md="2">
                    <v-btn
                      color="green"
                      block
                      dark
                      outlined
                      @click="sendValidadeCode"
                    >
                      Continuar
                      <v-icon> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-flex>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card outlined>
              <v-flex>
                <v-row align="center" justify="center">
                  <v-col md="2">
                    <v-icon color="cyan" size="128"> mdi-lock-reset </v-icon>
                  </v-col>
                  <v-col md="6" offset="3" class="ma-2">
                    <h2 class="ma-3">Alterar senha</h2>
                    <p class="mx-3">
                      Para finalizar altere sua senha. será enviado ao seu
                      e-mail uma mensagem informando que sua senha foi alterada
                    </p>
                    <v-text-field
                      name="password"
                      v-model="password"
                      label="Nova senha"
                      outlined
                      type="password"
                    />
                    <v-text-field
                      name="passwordConfirmation"
                      v-model="passwordConfirmation"
                      label="Confirmar senha"
                      outlined
                      type="password"
                    />
                  </v-col>
                </v-row>
                <v-row align="center" justify="center" class="ma-1">
                  <v-col md="2">
                    <v-btn
                      color="green"
                      block
                      dark
                      outlined
                      @click="updatePassword"
                    >
                      Finalizar
                      <v-icon> mdi-arrow-right </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-flex>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
    <ModalMessage
      :open="dialogStatus"
      :message="dialogMessage"
      :close="dialogClose"
      :type="dialogType"
    />
  </div>
</template>
<script src="./script.js"></script>
