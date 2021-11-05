<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      <p>
        <strong>
          Carregando ...
        </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de clientes"/>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="dataStore"
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
      :actClose="() => { formModal = false}"
      :editable="formActionInsertOrEdit"
    >
      <v-form ref="formRef" v-model="formValid">
      <v-row>
        <v-col md="1">
          <v-text-field
            label="id"
            outlined
            disabled
            v-model="formData.id"
            disabled
          />
        </v-col>
        <v-col md="7">
          <v-text-field
            label="Empresa"
            outlined
            v-model="formData.name"
            autofocus
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequired"
            min="6"
          />
        </v-col>
        <v-col md="4">
          <v-text-field
            label="CNPJ"
            outlined
            v-model="formData.document"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequired"
            min="11"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="5">
          <v-text-field
            label="Endereço"
            outlined
            v-model="formData.address"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequiredMin6"
          />
        </v-col>
        <v-col md="1">
          <v-text-field
            label="Número"
            outlined
            v-model="formData.num"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequiredMin6"
          />
        </v-col>
        <v-col md="2">
          <v-text-field
            label="Bairro"
            outlined
            v-model="formData.district"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequired"
          />
        </v-col>

        <v-col md="2">
          <v-text-field
            label="Cidade"
            outlined
            v-model="formData.city"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequired"
          />
        </v-col>

        <v-col md="2">
          <v-select
            label="Estado"
            outlined
            :items="['MG', 'SP', 'RJ']"
            v-model="formData.state"
            :disabled="!formActionInsertOrEdit"
            :rules="rulesRequired"
          />
        </v-col>
      </v-row>
      </v-form>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
