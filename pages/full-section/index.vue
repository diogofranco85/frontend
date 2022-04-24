<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Configurações do sistema" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container>
      <v-card>
        <v-system-bar color="primary" dark height="40"
          >Selecionar Cliente / Fazenda</v-system-bar
        >
        <v-container>
          <v-row>
            <v-col md="5">
              <v-select
                :items="selectClient"
                v-model="formData.idClient"
                label="Selecionar Cliente"
                name="client"
                flat
                outlined
                dense
                clearable
                @change="onChangeClient"
              />
            </v-col>

            <v-col md="5">
              <v-select
                :items="selectFarm"
                v-model="formData.idFarm"
                label="Selecionar fazenda"
                name="farm"
                flat
                outlined
                dense
                clearable
                @change="onChangeFarm"
              />
            </v-col>

            <v-col md="2">
              <v-btn
                outlined
                :color="list.length > 0 ? 'teal' : 'red'"
                :disabled="btnDisabled"
                @click="showList"
              >
                <v-icon>mdi-text-search</v-icon>
                <span>Exibir dados</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <Grid
      :headers="headers"
      :toolbarColor="'grey darken-1'"
      :items="list"
      :titulo="'lista de seções'"
      :actions="actions"
      :handleBtnNovo="add"
      :handleBtnAtualizar="reload"
      :evento1="edit"
      :evento2="view"
      :loading="loading"
    ></Grid>
    <Form
      :open="formModal"
      title="Cadastro de dados"
      :actClose="formClose"
      :editable="formActionInsertOrEdit"
      :actSave="save"
    >
      <validation-observer ref="formRef">
        <v-form @submit.prevent="save">
          <v-row>
            <v-col md="1">
              <v-text-field
                label="id"
                disabled
                v-model="formData.id"
                dense
                color="teal"
              />
            </v-col>
            <v-col md="3">
              <validation-provider
                vid="formData.level"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Nível de Água"
                  v-model="formData.level"
                  autofocus
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                  color="teal"
                  type="number"
                />
              </validation-provider>
            </v-col>

            <v-col md="3">
              <validation-provider
                vid="formData.area"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Seção Total (Ʃ áreas)"
                  v-model="formData.area"
                  autofocus
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                  color="teal"
                  type="number"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3" offset-md="1">
              <v-text-field
                label="Criado em"
                v-model="formData.createdAt"
                autofocus
                dense
                disabled
                color="teal"
                type="datetime"
              />
            </v-col>

            <v-col md="3">
              <v-text-field
                label="Atualizado em"
                v-model="formData.updatedAt"
                autofocus
                dense
                disabled
                color="teal"
                type="datetime"
              />
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
