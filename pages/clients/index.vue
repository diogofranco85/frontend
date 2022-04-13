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
      <validation-observer ref="formRef">
        <v-form @submit.prevent="saveData">
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
              <validation-provider
                vid="formData.name"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Empresa"
                  outlined
                  v-model="formData.name"
                  autofocus
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <validation-provider
                vid="formData.document"
                v-slot="{ errors }"
                :rules="{ required: true, min: 11 }"
              >
                <v-text-field
                  label="CNPJ"
                  outlined
                  v-mask="'##.###.###/####-##'"
                  v-model="formData.document"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="formData.phone2"
                :rules="{ required: true, min: 10 }"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Telefone Fixo"
                  outlined
                  v-mask="'(##)####-####'"
                  v-model="formData.phone2"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="formData.phone1"
                v-slot="{ errors }"
                :rules="{ required: true, min: 10 }"
              >
                <v-text-field
                  label="Telefone Celular"
                  outlined
                  v-mask="'(##)#####-####'"
                  v-model="formData.phone1"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="10">
              <validation-provider
                vid="formData.street"
                v-slot="{ errors }"
                :rules="{ required: true, min: 10 }"
              >
                <v-text-field
                  label="Endereço"
                  outlined
                  v-model="formData.street"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col md="2">
              <validation-provider
                vid="formData.number"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Número"
                  outlined
                  v-model="formData.number"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <validation-provider
                vid="formData.district"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Bairro"
                  outlined
                  v-model="formData.district"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="formData.city"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Cidade"
                  outlined
                  v-model="formData.city"
                  dense
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="4">
              <validation-provider
                vid="formData.idState"
                v-slot="{ errors }"
                rules="required"
              >
                <v-select
                  label="Estado"
                  outlined
                  v-model="formData.idState"
                  dense
                  :items="selectState"
                  :disabled="!formActionInsertOrEdit"
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

<script src="~/services/client/script.js"></script>
