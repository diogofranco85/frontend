<template>
  <v-row justify="center">
  <v-dialog
    width="70%"
    v-model="open"
    transition="dialog-bottom-transition"
  >
    <h3 class="topbar_border_bottom pa-3 cyan accent-4 text--grey">
      <v-btn
        icon
        @click="actClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span>HydroWatter</span>
    </h3>

    <v-card class="length_vertical-1">
     <h3 class="topbar_border_bottom pa-3 grey lighten-5 text--grey">
        {{title}}
      </h3>
      <v-container style="min-height: 70%" >
        <slot/>
      </v-container>
      <div class=" cyan accent-4 pa-2">
        <v-btn
          dark
          color="red"
          @click="actClose"
        >
          <v-icon>mdi-close</v-icon>
          Cancelar
        </v-btn>

        <v-btn
          v-if="editable"
          dark
          color="green lighten-1"
          @click="actSave"

        >
          <v-icon>mdi-floppy</v-icon>
          Salvar
        </v-btn>
      </div>
    </v-card>

  </v-dialog>
  </v-row>
</template>

<script src="./script.js"></script>
<style>
  .v-dialog--fullscreen {
    height: 100vh !important;
  }

</style>
