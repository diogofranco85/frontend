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
      <v-form ref="formRef" v-model="formValid" v-on:submit.prevent="saveData">
        <v-row>
          <v-col md="1">
            <v-text-field label="id" outlined disabled v-model="formData.id" />
          </v-col>
          <v-col md="12">
            <v-text-field
              label="Descrição"
              outlined
              v-model="formData.description"
              autofocus
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="6"
            />
          </v-col>
          <v-col md="4">
            <v-text-field
              label="Início"
              outlined
              v-model="formData.startDate"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="date"
            />
          </v-col>

          <v-col md="4">
            <v-text-field
              label="Término"
              outlined
              v-model="formData.endDate"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="date"
            />
          </v-col>
        </v-row>
      </v-form>
    </Form>
  </div>
</template>

<script src="~/services/time_courses/script.js"></script>
