<template>
  <v-row justify="center">
    <v-dialog width="70%" v-model="open" eager persistent>
      <v-system-bar height="50" window color="cyan accent-4" dark>
        <v-icon>mdi-file-document-edit</v-icon>
        <h3>HydroWater</h3>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="actClose" v-bind="attrs" v-on="on"
              >mdi-close</v-icon
            >
          </template>
          Fechar formulário
        </v-tooltip>
      </v-system-bar>
      <!-- <h3 class="topbar_border_bottom pa-3 cyan accent-4 text--grey">
        <v-btn icon @click="actClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span>HydroWatter</span>
      </h3> -->

      <v-card class="length_vertical-1">
        <h3 class="topbar_border_bottom pa-3 grey lighten-3 text--grey">
          {{ title }}
        </h3>
        <v-container>
          <slot />
        </v-container>
        <div class="cyan accent-4 pa-2">
          <v-btn dark color="red" @click="actClose">
            <v-icon>mdi-close</v-icon>
            Cancelar
          </v-btn>

          <v-btn v-if="editable" dark color="green lighten-1" @click="actSave">
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
