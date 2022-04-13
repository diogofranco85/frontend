<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de períodos de lançamentos" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="datagrid"
      :titulo="'Listagem de períodos de lançamentos'"
      :actions="gridActions"
      :handleBtnNovo="newData"
      :handleBtnAtualizar="loadData"
      :evento1="editData"
      :evento2="toFarm"
      :evento3="viewData"
      :loading="loading"
    ></Grid>
    <Form
      :open="formModal"
      title="Formulário de períodos de lançamentos"
      :actClose="() => (formModal = false)"
      :editable="formActionInsertOrEdit"
      :actSave="saveData"
    >
      <validation-observer ref="formRef">
        <v-form v-on:submit.prevent="saveData">
          <v-row>
            <v-col md="1">
              <v-text-field label="id" disabled v-model="formData.id" />
            </v-col>
            <v-col md="12">
              <validation-provider
                vid="formData.id"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Descrição"
                  v-model="formData.description"
                  autofocus
                  :disabled="!formActionInsertOrEdit"
                  :rules="rulesRequired"
                  min="6"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col md="4">
              <validation-provider
                vid="formData.id"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Início"
                  v-model="formData.startDate"
                  :disabled="!formActionInsertOrEdit"
                  :rules="rulesRequired"
                  type="date"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="formData.id"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Término"
                  v-model="formData.endDate"
                  :disabled="!formActionInsertOrEdit"
                  :rules="rulesRequired"
                  type="date"
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

<script src="~/services/time_courses/script.js"></script>
