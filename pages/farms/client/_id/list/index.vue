<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de fazendas" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="ma-3" outlined>
      <h3 class="topbar_border_bottom pa-3 blue lighten-5 text--grey">
        Dados do cliente
      </h3>
      <v-row class="ma-2">
        <v-col md="4">
          <v-text-field
            label="Empresa"
            outlined
            v-model="clientData.name"
            :disabled="true"
            dense
          />
        </v-col>
        <v-col md="2">
          <v-text-field
            label="CNPJ"
            outlined
            v-mask="'##.###.###/####-##'"
            v-model="clientData.document"
            dense
            :disabled="true"
          />
        </v-col>
        <v-col md="2">
          <v-text-field
            label="Telefone Fixo"
            outlined
            v-mask="'(##)#####-####'"
            v-model="clientData.phone2"
            dense
            :disabled="true"
          />
        </v-col>

        <v-col md="2">
          <v-text-field
            label="Telefone Celular"
            outlined
            v-mask="'(##) #####-####'"
            v-model="clientData.phone1"
            dense
            :disabled="true"
          />
        </v-col>

        <v-col md="2">
          <v-text-field
            label="Cidade"
            outlined
            v-model="clientData.city"
            dense
            :disabled="true"
          />
        </v-col>
      </v-row>
    </v-card>
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="datagrid"
      :titulo="'Listagem de fazendas'"
      :actions="gridActions"
      :handleBtnNovo="newData"
      :handleBtnAtualizar="loadData"
      :evento1="editData"
      :evento2="toPage"
      :evento3="viewData"
      :loading="loading"
    ></Grid>
    <Form
      :open="formModal"
      title="Formulário de fazendas"
      :actClose="() => (formModal = false)"
      :editable="formActionInsertOrEdit"
      :actSave="saveData"
    >
      <v-form ref="formRef" v-model="formValid" v-on:submit.prevent="saveData">
        <v-row>
          <v-col md="1">
            <v-text-field label="id" outlined disabled v-model="formData.id" />
          </v-col>
          <v-col md="7">
            <v-text-field
              label="Fazenda"
              outlined
              v-model="formData.name"
              autofocus
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="6"
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              label="Longitude"
              outlined
              v-model="formData.longitude"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              label="Latitude"
              outlined
              v-model="formData.latitude"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              label="Horimetro/Limite dia"
              outlined
              v-model="formData.limitHorimeterDay"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              label="Horas/Limite dia"
              outlined
              v-model="formData.limitHourDay"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
            />
          </v-col>

          <v-col md="2">
            <v-select
              name="idTypeMeter"
              v-model="formData.idTypeMeter"
              outlined
              :items="selectTypeMeter"
              label="Tipo de medição"
            />
          </v-col>

          <v-col md="4">
            <v-text-field
              label="Email"
              outlined
              v-model="formData.email"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              type="email"
              min="11"
            />
          </v-col>

          <v-col md="2">
            <v-text-field
              label="Telefone"
              outlined
              v-mask="'(##)#####-####'"
              v-model="formData.phone"
              :disabled="!formActionInsertOrEdit"
              :rules="rulesRequired"
              min="11"
            />
          </v-col>
        </v-row>
      </v-form>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
