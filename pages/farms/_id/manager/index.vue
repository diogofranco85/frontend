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
      :options="optionsMaps"
      :map-type-id="mapType"
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
      <v-col md="12">
        <v-card elevation="0" class="ma-1" outlined tile>
          <v-toolbar color="cyan accent-4" dark dense flat>
            <v-toolbar-title>
              <span>Dados para medições</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn
              outlined
              dark
              color="white"
              class="ma-2"
              @click="meterModalOpen"
            >
              <v-icon color="white darken-3"> mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-spacer></v-spacer>

          <v-row>
            <v-col>
              <v-simple-table class="ma-2" dense fixed-header>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <!-- <th class="text-left">ID</th> -->
                      <th class="text-left">Tipo de Medição</th>
                      <th class="text-left">Nº Outorga</th>
                      <th class="text-left">Nivel estático</th>
                      <th class="text-left">Nivel dinânico</th>
                      <th class="text-left">Volume Máximo / Mês</th>
                      <th class="text-left">Volume Máximo / Dia</th>
                      <th class="text-left">Horas Maximas / Dia</th>
                      <th class="text-left">Nível Minimo / Residual</th>
                      <th class="text-center grey lighten-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in meterItems" :key="item.name">
                      <td>
                        <strong>{{ item.descriptiveItem.value }}</strong>
                      </td>
                      <td>{{ item.outorga.concierge }}</td>
                      <td>
                        {{
                          item.levelStatic != 0
                            ? item.levelStatic.toFixed(2)
                            : ""
                        }}
                      </td>
                      <td>
                        {{
                          item.levelDynamic != 0
                            ? item.levelDynamic.toFixed(2)
                            : ""
                        }}
                      </td>
                      <td>
                        {{
                          item.volMaxMouth != 0
                            ? item.volMaxMouth.toFixed(2)
                            : ""
                        }}
                      </td>
                      <td>
                        {{
                          item.volMaxDay != 0 ? item.volMaxDay.toFixed(2) : ""
                        }}
                      </td>
                      <td>
                        {{
                          item.hourMaxDay != 0 ? item.hourMaxDay.toFixed(2) : ""
                        }}
                      </td>
                      <td>
                        {{
                          item.levelMinResidualFlow != 0
                            ? item.levelMinResidualFlow.toFixed(2)
                            : ""
                        }}
                      </td>
                      <td class="pa-1">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              text
                              v-on="on"
                              v-bind="attrs"
                              outlined
                              small
                              color="green"
                              selectable
                            >
                              <span>menu</span>
                            </v-btn>
                          </template>
                          <v-list flat>
                            <v-list-item selectable>
                              <v-btn
                                outlined
                                small
                                min-width="100%"
                                color="green"
                                @click="gridActHidrometro(item.id)"
                              >
                                <v-icon class="mr-2" color="green">
                                  mdi-beaker-plus-outline</v-icon
                                >
                                <span>Hidrometro</span>
                              </v-btn>
                            </v-list-item>
                            <v-list-item selectable>
                              <v-btn
                                outlined
                                small
                                min-width="100%"
                                color="yellow darken-4"
                                @click="gridActEdit(item.id)"
                              >
                                <v-icon class="mr-2" color="yellow darken-4">
                                  mdi-pencil-outline</v-icon
                                >
                                <span>Editar</span>
                              </v-btn>
                            </v-list-item>
                            <v-list-item selectable>
                              <v-btn
                                outlined
                                small
                                min-width="100%"
                                color="red ligthen-2"
                                @click="gridActDelete(item.id)"
                              >
                                <v-icon class="mr-2" color="red ligthen-2">
                                  mdi-delete</v-icon
                                >
                                <span>Excluir</span>
                              </v-btn>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <Form
      :open="meterModal"
      title="Dados de medição"
      :actClose="meterModalClose"
      :actSave="meterModalSave"
      :editable="true"
    >
      <validation-observer ref="formMeterRef">
        <v-form @submit.prevent="loginRequest">
          <v-row>
            <v-col md="4">
              <validation-provider
                vid="meterData.idTypeMeter"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  v-model="meterData.idTypeMeter"
                  name="outorga"
                  label="Tipo de medição"
                  type="number"
                  :items="selectTypeMeter"
                  placeholder="Entre com o valor"
                  required
                  :error-messages="errors"
                  outlined
                  dense
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="meterData.idOutorga"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  v-model="meterData.idOutorga"
                  name="outorga"
                  label="N. Ourtoga"
                  type="number"
                  :items="selectOutorgas"
                  placeholder="Entre com o valor"
                  required
                  :error-messages="errors"
                  outlined
                  dense
                />
              </validation-provider>
            </v-col>

            <v-col md="2">
              <validation-provider
                vid="meterData.levelStatic"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.levelStatic"
                  name="nivelEstatico"
                  label="Nível Estático"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="2">
              <validation-provider
                vid="meterData.levelDynamic"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.levelDynamic"
                  name="nivelDinamico"
                  label="Nível Dinâmico"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <validation-provider
                vid="meterData.volMaxMouth"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.volMaxMouth"
                  name="volMaxMouth"
                  label="Volume Máx / Mês"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="3">
              <validation-provider
                vid="meterData.volMaxDay"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.volMaxDay"
                  name="volMaxDay"
                  label="Volume Máx / Dia"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="3">
              <validation-provider
                vid="meterData.hourMaxDay"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.hourMaxDay"
                  name="hourMaxDay"
                  label="Horas Máx. / Dia"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="3">
              <validation-provider
                vid="meterData.levelMinResidualFlow"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="meterData.levelMinResidualFlow"
                  name="levelMinResidualFlow"
                  label="Nível Min. Residual"
                  type="number"
                  placeholder="Entre com o valor"
                  required
                  outlined
                  dense
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </Form>
  </div>
</template>

<script src="~/services/farms/manager/script.js"></script>
