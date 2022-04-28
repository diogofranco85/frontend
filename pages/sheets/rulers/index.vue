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
              v-model="formData.dateInclude"
              flat
              outlined
              label="Data de lançamento"
              type="date"
              dense
            />
          </v-col>
        </v-row>
        <validation-observer ref="formRef">
          <v-form @submit.prevent="add">
            <v-row class="mt-0">
              <v-col md="2">
                <validation-provider
                  vid="formData.levelMed"
                  v-slot="{ errors }"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    label="Nível Médio Monit. (m)"
                    outlined
                    v-model="formData.levelMed"
                    type="number"
                    dense
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>

              <v-col md="2">
                <validation-provider
                  vid="formData.velMed"
                  v-slot="{ errors }"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    label="Vel. Média (m/s)"
                    outlined
                    v-model="formData.velMed"
                    type="number"
                    dense
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>

              <v-col md="1">
                <v-btn outlined dark color="blue" @click="getFullSecton">
                  <span>Seção</span>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>

              <v-col md="2">
                <validation-provider
                  vid="formData.fullSection"
                  v-slot="{ errors }"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    label="Seção Total (m²)"
                    outlined
                    v-model="formData.fullSection"
                    type="datetime"
                    dense
                    disabled
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>

              <v-col md="2" class="">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      x-large
                      icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="add"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Adicionar dados</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
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
          v-if="itemGridMeterList.length > 0"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nº Outorga</th>
                <th class="text-left">Nível Minimo / Residual</th>
              </tr>
            </thead>
            <tbody style="font-size: 10px">
              <tr v-for="itemGrid in itemGridMeterList" :key="itemGrid.id">
                <td>
                  <strong>{{ itemGrid.Outorga.concierge }}</strong>
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
    <v-card outlined class="ma-4" v-if="itemGridMeterList && flow.length > 0">
      <v-system-bar color="primary" dark height="40"
        >Planilha de medição</v-system-bar
      >
      <v-card-text>
        <v-simple-table class="ma-2" dense fixed-header density="compact">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center blue lighten-4">Data lançamento</th>
                <th class="text-center">Nível Médio Monit. (m)</th>
                <th class="text-center">Vel. Média (m/s)</th>
                <th class="text-center">Seção Total (m²)</th>
                <th class="text-center">Q curso d'água (m³/s)</th>
                <th class="text-center grey">Ações</th>
              </tr>
            </thead>
            <tbody style="font-size: 10px">
              <tr v-for="list in flow" :key="list.id">
                <td class="text-center">{{ list.dateInclude }}</td>
                <td class="text-center">{{ list.levelMed }}</td>
                <td class="text-center">{{ list.velMed }}</td>
                <td class="text-center">{{ list.fullSection }}</td>
                <td class="text-center">
                  {{ (list.velMed * list.fullSection).toFixed(3) }}
                </td>
                <td class="text-center">
                  <v-btn outlined color="red lighten-2" @click="del(list)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!-- <v-row>
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
        </v-row> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="~/services/sheets/rulers/script.js"></script>
