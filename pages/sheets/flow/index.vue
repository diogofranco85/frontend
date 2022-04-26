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
              @change="onChangeTypeMeter"
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
              @change="onChangeFarm"
            />
          </v-col>
          <v-col md="2">
            <v-select
              :items="selectTimeCourses"
              v-model="formData.idTimesCourses"
              label="Período"
              name="Periodo"
              @change="onChangeTimeCourse"
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
        <v-row v-if="listHydrometers.length > 0" class="mt-0">
          <v-col md="2" v-for="(item, index) in listHydrometers" :key="item.id">
            <v-card elevation="2" outlined class="pa-3">
              <p><strong>Identificação: </strong>{{ item.identifier }}</p>
              <v-text-field
                name="hidro-05"
                v-model="field.hydro[index]"
                :label="`Volume de ${item.identifier}`"
                color="teal"
                outlined
                dense
                type="number"
                :value="0"
              />
              <v-text-field
                name="hidro-01"
                v-model="field.hour[index]"
                :label="`Horas de ${item.identifier}`"
                color="teal"
                outlined
                :value="0"
                type="number"
                dense
              />
              <input
                name="id"
                type="hidden"
                disabled
                :value="(field.id[index] = item.id)"
                label=""
                outlined
                color="teal"
                dense
              />
            </v-card>
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
                  @click="addMeter"
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
    <v-card outlined class="ma-4">
      <v-system-bar color="primary" dark height="40"
        >Informe sobre os dados da medição</v-system-bar
      >
      <v-card-text>
        <v-simple-table
          class="ma-2"
          dense
          fixed-header
          v-if="itemGridMeterList && listHydrometers.length > 0"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nº Outorga</th>
                <th class="text-left">Nivel estático</th>
                <th class="text-left">Nivel dinânico</th>
                <th class="text-left">Volume Máximo / Mês</th>
                <th class="text-left">Volume Máximo / Dia</th>
                <th class="text-left">Horas Maximas / Dia</th>
                <th class="text-left">Nível Minimo / Residual</th>
              </tr>
            </thead>
            <tbody style="font-size: 10px">
              <tr v-for="itemGrid in itemGridMeterList" :key="itemGrid.id">
                <td>
                  <strong>{{ itemGrid.Outorga.concierge }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.levelStatic }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.levelDynamic }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.volMaxMouth }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.volMaxDay }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.hourMaxDay }}</strong>
                </td>
                <td>
                  <strong>{{ itemGrid.levelMinResidualFlow }}</strong>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-card
      outlined
      class="ma-4"
      v-if="itemGridMeterList && listHydrometers.length > 0"
    >
      <v-system-bar color="primary" dark height="40"
        >Planilha de medição</v-system-bar
      >
      <v-card-text>
        <v-simple-table class="ma-2" dense fixed-header density="compact">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center blue lighten-4">Data lançamento</th>
                <fragment v-for="item in listHydrometers" :key="item.id">
                  <th class="text-center">M³/{{ item.identifier }}</th>
                  <th class="text-center">Hr/{{ item.identifier }}</th>
                </fragment>
                <th class="text-center">M³/Dia</th>
                <th class="text-center">Hr/Dia</th>
                <th class="text-center">Média/Dia</th>
                <th class="text-center grey">Ações</th>
              </tr>
            </thead>
            <tbody style="font-size: 10px">
              <tr v-for="list in datagrid.data" :key="list.id">
                <td class="text-center">{{ list.dateInclude }}</td>
                <fragment v-for="item in list.items" :key="item.id">
                  <td class="text-center">{{ item.horimeter }}</td>
                  <td class="text-center">{{ item.hourmeter }}</td>
                </fragment>
                <td class="text-center">{{ list.calcHori }}</td>
                <td class="text-center">{{ list.calcHour }}</td>
                <td class="text-center">{{ list.media }}</td>
                <td class="text-center">
                  <v-btn outlined color="red lighten-2" @click="delData(list)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center grey lighten-4">Dias Mês</th>
                <th class="text-center grey lighten-4">Volume</th>
              </tr>
            </thead>
            <tbody style="font-size: 10px">
              <tr>
                <td width="200px" class="text-center">{{ datagrid.days }}</td>
                <td width="200px" class="text-center">{{ datagrid.volume }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- <div outlined v-if="flowSheets.length > 0">
      <Sheet
        :items="flowSheetData"
        :deleteAct="delData"
        :updateAct="getDataFlow"
        :limitHidrometer="limitHorimeterDay"
        :limitHour="limitHourDay"
      />
    </div> -->
  </div>
</template>

<script src="~/services/sheets/flow/script.js"></script>
