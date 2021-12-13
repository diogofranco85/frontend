<template>
  <div>
    <TopBar title="Página inicial"></TopBar>
    <v-container>
      <v-card outlined class="pa-3">
        <TopBar title="Gráficos sobre o cliente"></TopBar>
        <v-row class="pa-2">
          <v-col md="4">
            <Doughnut
              :dados="average"
              titulo="Média Capitada Diária"
              :loading="loading"
              labelRender1="Ola 1"
              labelRender2="Ola 2"
              :legenda="true"
            />
          </v-col>

          <v-col md="4">
            <Doughnut
              :dados="hoursDay"
              titulo="Horimetro"
              :loading="loading"
              labelRender1="Ola 1"
              labelRender2="Ola 2"
              :legenda="true"
            />
          </v-col>

          <v-col md="4">
            <Doughnut
              :dados="cubicMeterDay"
              titulo="Metros Cubícos"
              :loading="loading"
              labelRender1="Ola 1"
              labelRender2="Ola 2"
              :legenda="true"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script src="./script.js"></script>
