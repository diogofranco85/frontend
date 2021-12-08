<template>
  <div>
    <TopBar title="Página inicial"></TopBar>
    <v-container>
      <v-card outlined class="pa-3">
        <TopBar title="Gráficos sobre o cliente"></TopBar>
        <v-row class="pa-2">
          <v-col md="3">
            <v-select :items="selectClient" label="Cliente" outlined />
          </v-col>
          <v-col md="3">
            <v-select :items="selectFarm" label="Fazenda" outlined />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <ModalMessage
      :open="modelMessage"
      message="ola mundo"
      :close="closeModal"
      type="error"
    />
    <v-btn @click="abrirModal">Abrir Modal</v-btn>
  </div>
</template>

<script src="./script.js"></script>
