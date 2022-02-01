<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de usuários" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="datagrid"
      :titulo="'Listagem de usuários'"
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
      title="Formulário de usuarios"
      :actClose="() => (formModal = false)"
      :editable="formActionInsertOrEdit"
      :actSave="saveData"
    >
      <v-form ref="formRef" v-model="formValid" v-on:submit.prevent="saveData">
        <v-row>
          <v-col md="1">
            <v-text-field label="id" outlined disabled v-model="formData.id" />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-text-field
              label="Nome completo"
              outlined
              v-model="formData.name"
              autofocus
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="6"
            />
          </v-col>
          <v-col md="6">
            <v-text-field
              label="Email"
              outlined
              v-model="formData.email"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="email"
            />
          </v-col>

          <v-col md="2">
            <v-select
              label="Estado"
              outlined
              :items="selectProfile"
              v-model="formData.idProfile"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              v-if="formActionInsertOrEdit"
              label="Senha"
              outlined
              v-model="formData.password"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="password"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              v-if="formActionInsertOrEdit"
              label="Confirma senha"
              outlined
              v-model="formData.passwordConfirmation"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="password"
            />
          </v-col>
        </v-row>
      </v-form>
    </Form>
    <ModalMessage
      :open="dialogStatus"
      :message="dialogMessage"
      :close="dialogClose"
      :type="dialogType"
    />
  </div>
</template>

<script src="~/services/users/script.js"></script>
