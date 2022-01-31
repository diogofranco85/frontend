<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de clientes" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="datagrid"
      :titulo="'Listagem de clientes'"
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
      title="Formulário de clientes"
      :actClose="() => (formModal = false)"
      :editable="formActionInsertOrEdit"
      :actSave="saveData"
    >
      <v-form ref="formRef" v-model="formValid" v-on:submit.prevent="saveData">
        <v-row>
          <v-col md="1">
            <v-text-field
              label="id"
              outlined
              disabled
              v-model="formData.id"
              dense
            />
          </v-col>
          <v-col md="11">
            <v-text-field
              label="Empresa"
              outlined
              v-model="formData.name"
              autofocus
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="6"
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4">
            <v-text-field
              label="CNPJ"
              outlined
              v-mask="'##.###.###/####-##'"
              v-model="formData.document"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
              dense
            />
          </v-col>

          <v-col md="4">
            <v-text-field
              label="Telefone Fixo"
              outlined
              v-mask="'(##)####-####'"
              v-model="formData.phone2"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              dense
              min="11"
            />
          </v-col>

          <v-col md="4">
            <v-text-field
              label="Telefone Celular"
              outlined
              v-mask="'(##)#####-####'"
              v-model="formData.phone1"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              dense
              min="11"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="10">
            <v-text-field
              label="Endereço"
              outlined
              v-model="formData.street"
              :disabled="!formActionInsertOrEdit"
              dense
              :rules="rulesRequiredMin6"
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              label="Número"
              outlined
              v-model="formData.number"
              :disabled="!formActionInsertOrEdit"
              dense
              :rules="rulesRequired"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4">
            <v-text-field
              label="Bairro"
              outlined
              v-model="formData.district"
              :disabled="!formActionInsertOrEdit"
              dense
              :rules="rulesRequired"
            />
          </v-col>

          <v-col md="4">
            <v-text-field
              label="Cidade"
              outlined
              v-model="formData.city"
              :disabled="!formActionInsertOrEdit"
              dense
              :rules="rulesRequired"
            />
          </v-col>

          <v-col md="4">
            <v-select
              label="Estado"
              outlined
              :items="selectState"
              v-model="formData.idState"
              :disabled="!formActionInsertOrEdit"
              dense
              :rules="rulesRequired"
            />
          </v-col>
        </v-row>
      </v-form>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
