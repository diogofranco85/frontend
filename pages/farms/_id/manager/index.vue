<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de Hidrometro" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <GmapMap
      :center="{ lng: longitude, lat: latitude }"
      :zoom="15"
      map-type-id="satellite"
      style="width: 100%; height: 350px; border: solid 1px #eee"
    >
      <GmapMarker
        :position="{ lng: longitude, lat: latitude }"
        :clickable="false"
        :shape="{ coords: [10, 10, 10, 15, 15, 15, 15, 10], type: 'poly' }"
      ></GmapMarker>
    </GmapMap>
    <v-row>
      <v-col>
        <v-card elevation="0" class="ma-2" outlined>
          <v-toolbar color="cyan accent-4" dark dense flat>
            <v-toolbar-title>Dados da fazenda</v-toolbar-title>
          </v-toolbar>
          <v-row class="ma-2">
            <v-col md="2">
              <strong>Fazenda:</strong> {{ farmData.name }}
            </v-col>
            <v-col md="2">
              <strong>Latitude:</strong> {{ farmData.longitude }}
            </v-col>
            <v-col md="2">
              <strong>Longitude:</strong> {{ farmData.latitude }}
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-card class="ma-2" outlined>
          <Form
            :open="hydrometerModal"
            title="Cadastro de hidrometro"
            :actClose="() => (hydrometerModal = false)"
            :editable="true"
            :actSave="hydrometerSave"
          >
            <v-row>
              <v-col md="4">
                <v-text-field
                  v-model="hydrometerForm.identifier"
                  label="Identificador"
                  outlined
                  required
                  min="11"
                />
              </v-col>
            </v-row>
          </Form>
          <v-row>
            <v-col md="12">
              <Grid
                :headers="hydrometerHeader"
                :toolbarColor="'cyan accent-4'"
                :items="hydrometerData"
                :titulo="'Listagem de hydrometros'"
                :actions="hydrometerActions"
                :handleBtnAtualizar="getHydrometer"
                :handleBtnNovo="hydrometerNew"
                :evento1="hydrometerDel"
                :loading="hydrometerLoading"
              ></Grid>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card class="ma-2" outlined>
          <v-card-title>Nivels de medição</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./script.js"></script>
