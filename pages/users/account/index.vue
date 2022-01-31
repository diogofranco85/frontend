<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Meus dados" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container class="ma-4">
      <v-row>
        <v-col md="3">
          <v-icon size="128" color="cyan accent-4"> mdi-account-circle </v-icon>
        </v-col>
        <v-col align-self="center">
          <small>Nome completo</small>
          <h1 color="cyan accent-4">{{ account.name }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="3">
          <small>Email</small>
          <h3>{{ account.email }}</h3>
        </v-col>

        <v-col>
          <small>Perfil</small>
          <h3>{{ account.profile }}</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script src="./script.js"></script>
