<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Lançamento de dados na planilha" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="ma-3" outlined>
      <v-system-bar color="primary" dark height="40"
        >Dados para lançamento</v-system-bar
      >
      <v-container>
        <v-row>
          <v-col md="3">
            <v-select
              :items="selectClient"
              v-model="formData.idClient"
              label="Cliente"
              name="cliente"
              @change="onChangeClient"
              flat
              outlined
              dense
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectFarm"
              v-model="formData.idFarm"
              label="Fazenda"
              name="fazenda"
              @change="onChangeFarm"
              flat
              outlined
              dense
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectHydrometer"
              v-model="formData.idHydrometer"
              label="Hidrometro"
              name="hidrometro"
              @change="onChangeHydrometer"
              flat
              outlined
              dense
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectTimeCourses"
              v-model="formData.idTimesCourses"
              label="Período"
              name="periodo"
              @change="onChangeTimeCourses"
              flat
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="formShow">
        <v-row>
          <v-col md="3">
            <v-text-field
              name="date"
              v-model="formData.calculationDate"
              flat
              outlined
              label="Data de lançamento"
              type="date"
              dense
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="metrosdiario"
              v-model="formData.hydrometerValue"
              flat
              outlined
              label="Hidrometro"
              type="number"
              dense
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.hourmeterValue"
              flat
              outlined
              label="Horimetro"
              type="number"
              dense
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.levelStatic"
              flat
              outlined
              label="Nível Estático"
              disabled
              dense
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.levelDynamic"
              flat
              outlined
              label="Nível Dinâmico"
              disabled
              dense
            />
          </v-col>
          <v-col md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  x-large
                  icon
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="newData"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Adicionar dados</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div outlined v-if="flowSheets.length > 0">
      <Sheet
        :items="flowSheetData"
        :deleteAct="delData"
        :updateAct="getDataFlow"
        :limitHidrometer="limitHorimeterDay"
        :limitHour="limitHourDay"
      />
    </div>
  </div>
</template>

<script src="./script.js"></script>
