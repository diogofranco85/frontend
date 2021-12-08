<template>
  <v-dialog v-model="model" max-width="500" close-delay="3" persistent>
    <v-card>
      <v-system-bar height="30" window color="cyan accent-4">
        <strong>Notificação do sistema</strong>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="close" v-bind="attrs" v-on="on">mdi-close</v-icon>
          </template>
          Fechar mensagem
        </v-tooltip>
      </v-system-bar>
      <v-flex class="pa-5 white" xs12>
        <v-row class="mb-2" align="center" justify="center">
          <v-icon size="96" :color="color">{{ icon }}</v-icon>
        </v-row>
        <v-row class="mb-2" align="center" justify="center">
          <h4>{{ message }}</h4>
        </v-row>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script src="./script.js"></script>
