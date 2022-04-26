<template>
  <div>
    <v-dialog
      v-model="model"
      transition="dialog-bottom-transition"
      eager
      persistent
      width="70%"
    >
      <v-card>
        <v-system-bar height="50" window color="cyan accent-4" dark>
          <v-icon>mdi-file-document-edit</v-icon>
          <h3>Hidrometro</h3>
          <v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="close" v-bind="attrs" v-on="on">mdi-close</v-icon>
            </template>
            Fechar formulário
          </v-tooltip>
        </v-system-bar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-card outlined class="ma-2" width="100%">
                <v-system-bar color="grey darken-2" dark class="pt-4 pb-4">
                  Formulário
                </v-system-bar>
                <v-card-text>
                  <validation-observer ref="formRef">
                    <v-form @submit.prevent="saveData">
                      <v-row>
                        <!-- <v-col md="2">
                          <v-text-field
                            v-model="formData.id"
                            name="ID"
                            label="Código"
                            type="number"
                            placeholder="Entre com o valor"
                            disabled
                            outlined
                            dense
                          />
                        </v-col> -->
                        <v-col md="3">
                          <validation-provider
                            vid="formData.identifier"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="formData.identifier"
                              name="identifier"
                              label="Identificador/Serial"
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
                            vid="formData.tag"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="formData.tag"
                              name="tag"
                              label="TAG"
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
                            vid="formData.tag"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="formData.initialHydroValue"
                              name="initialHydroValue"
                              label="Hidrometro Inicial"
                              placeholder="Entre com o valor"
                              required
                              dense
                              outlined
                              :error-messages="errors"
                            />
                          </validation-provider>
                        </v-col>

                        <v-col md="3">
                          <validation-provider
                            vid="formData.tag"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="formData.initialHourValue"
                              name="initialHourValue"
                              label="Horimetro Inicial"
                              placeholder="Entre com o valor"
                              required
                              dense
                              outlined
                              :error-messages="errors"
                            />
                          </validation-provider>
                        </v-col>

                        <v-col md="4">
                          <v-btn color="green" outlined @click="saveData">
                            <v-icon class="pr-3">mdi-content-save</v-icon>
                            <span>Incluir</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </validation-observer>
                </v-card-text>
              </v-card>
            </v-row>
            <v-row>
              <Grid
                :headers="header"
                :toolbarColor="'grey darken-1'"
                :items="hydrometer"
                :titulo="'Listagem de hydrometer'"
                :actions="gridActions"
                :handleBtnNovo="openForm"
                :handleBtnAtualizar="loadData"
                :evento1="deleteData"
                :loading="loading"
              ></Grid>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="./script.js"></script>
