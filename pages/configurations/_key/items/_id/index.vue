<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Configurações do sistema | item" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card outlined class="ma-2 teal lighten-4">
      <v-container>
        <h2 color="teal">{{ titleBar }}</h2>
      </v-container>
    </v-card>
    <Grid
      :headers="headers"
      :toolbarColor="'grey darken-1'"
      :items="list"
      :titulo="'Configurações'"
      :actions="actions"
      :handleBtnNovo="add"
      :handleBtnAtualizar="reload"
      :evento1="edit"
      :evento2="view"
      :loading="loading"
    ></Grid>
    <Form
      :open="formModal"
      title="Cadastro de parametros"
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
                vid="formData.name"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Chave"
                  v-model="formData.name"
                  autofocus
                  dense
                  :disabled="!formEditKey"
                  :error-messages="errors"
                  color="teal"
                />
              </validation-provider>
            </v-col>

            <v-col md="8">
              <validation-provider
                vid="formData.value"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Valor"
                  v-model="formData.value"
                  autofocus
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                  color="teal"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="2">
              <v-text-field
                label="Criado em"
                v-model="formData.createdAt"
                autofocus
                dense
                disabled
                color="teal"
              />
            </v-col>

            <v-col md="2">
              <v-text-field
                label="Atualizado em"
                v-model="formData.updatedAt"
                autofocus
                dense
                disabled
                color="teal"
              />
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
