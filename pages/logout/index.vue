<template>
  <div>
    <v-overlay :value="true">
      <v-container fluid align="center">
        <center>
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          <p>
            <strong> Carregando ... realizando logout do usuário </strong>
          </p>
        </center>
      </v-container>
    </v-overlay>
    <ModalMessage
      :open="dialogStatus"
      :message="dialogMessage"
      :close="dialogClose"
      :type="dialogType"
    />
  </div>
</template>

<script src="~/services/logout/script.js"></script>
