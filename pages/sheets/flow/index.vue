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
          <v-col md="2">
            <v-select
              :items="selectTypeMeter"
              v-model="formData.idTypeMeter"
              label="Tipo de medição"
              name="tipoMedicao"
              flat
              outlined
              dense
            />
          </v-col>
          <v-col md="2">
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

          <v-col md="2">
            <v-select
              :items="selectFarm"
              v-model="formData.idFarm"
              label="Fazenda"
              name="fazenda"
              flat
              outlined
              dense
            />
          </v-col>
          <v-col md="2">
            <v-select
              :items="selectTimeCourses"
              v-model="formData.idTimesCourse"
              label="Período"
              name="Periodo"
              @change="onChangeFarm"
              flat
              outlined
              dense
            />
          </v-col>
          <v-col md="3" v-if="fieldsetView">
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
        </v-row>
        <v-row v-if="fieldsetView" class="mt-0">
          <v-col md="2">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação:</strong></p>
              <v-text-field
                name="hidro-01"
                v-model="field.hydro01.value"
                label="Hidrometro 01"
                flat
                outlined
                dense
              />
              <v-text-field
                name="hidro-01"
                v-model="field.hydro01.hour"
                label="Horimetro 01"
                flat
                outlined
                dense
              />
            </v-card>
          </v-col>

          <v-col md="2" v-if="contHidro >= 2">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação:</strong></p>
              <v-text-field
                name="hidro-02"
                v-model="field.hydro02.value"
                label="Hidrometro 02"
                flat
                outlined
                dense
              />
              <v-text-field
                name="hidro-01"
                v-model="field.hydro02.hour"
                label="Horimetro 02"
                flat
                outlined
                dense
              />
            </v-card>
          </v-col>

          <v-col md="2" v-if="contHidro >= 3">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação:</strong></p>
              <v-text-field
                name="hidro-03"
                v-model="field.hydro03.value"
                label="Hidrometro 03"
                flat
                outlined
                dense
              />
              <v-text-field
                name="hidro-03"
                v-model="field.hydro03.hour"
                label="Horimetro 03"
                flat
                outlined
                dense
              />
            </v-card>
          </v-col>

          <v-col md="2" v-if="contHidro >= 4">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação:</strong></p>
              <v-text-field
                name="hidro-04"
                v-model="field.hydro04.value"
                label="Hidrometro 04"
                flat
                outlined
                dense
              />
              <v-text-field
                name="hidro-01"
                v-model="field.hydro04.hour"
                label="Horimetro 04"
                flat
                outlined
                dense
              />
            </v-card>
          </v-col>

          <v-col md="2" v-if="contHidro >= 5">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação:</strong></p>
              <v-text-field
                name="hidro-05"
                v-model="field.hydro05.value"
                label="Hidrometro 05"
                flat
                outlined
                dense
              />
              <v-text-field
                name="hidro-01"
                v-model="field.hydro05.hour"
                label="Horimetro 05"
                flat
                outlined
                dense
              />
              ></v-card
            >
          </v-col>

          <v-col md="2" class="pa-14">
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

<script src="~/services/sheets/flow/script.js"></script>
