<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Lançamento de dados na planilha" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="ma-3" outlined>
      <v-system-bar color="cyan accent-4" dark
        >Dados para lançamento</v-system-bar
      >
      <v-container>
        <v-row>
          <v-col md="3">
            <v-select
              :items="selectClient"
              v-model="formData.idClient"
              label="Cliente"
              name="cliente"
              @change="onChangeClient"
              outlined
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectFarm"
              v-model="formData.idFarm"
              label="Fazenda"
              name="fazenda"
              @change="onChangeFarm"
              outlined
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectHydrometer"
              v-model="formData.idHydrometer"
              label="Hidrometro"
              name="hidrometro"
              outlined
              @change="onChangeHydrometer"
            />
          </v-col>

          <v-col md="3">
            <v-select
              :items="selectTimeCourses"
              v-model="formData.idTimesCourses"
              label="Período"
              name="periodo"
              @change="onChangeTimeCourses"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="formShow">
        <v-row>
          <v-col md="3">
            <v-text-field
              name="date"
              v-model="formData.calculationDate"
              outlined
              label="Nível Estático"
              type="date"
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="metrosdiario"
              v-model="formData.hydrometerValue"
              outlined
              label="Valor hidrometro"
              type="number"
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.hourmeterValue"
              outlined
              label="Valor Hora"
              type="number"
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.levelStatic"
              outlined
              label="Nível Estático"
              disabled
            />
          </v-col>
          <v-col md="2">
            <v-text-field
              name="levelStatic"
              v-model="formData.levelDynamic"
              outlined
              label="Nível Dinâmico"
              disabled
            />
          </v-col>
          <v-col md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  x-large
                  icon
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                  @click="newData"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Adicionar dados</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card outlined>
      <Grid
        :headers="headerGrid"
        :toolbarColor="'cyan accent-4'"
        :items="flowSheets"
        :titulo="'Listagem de clientes'"
        :actions="gridActions"
        :handleBtnNovo="() => {}"
        :handleBtnAtualizar="getDataFlow"
        :evento1="delData"
        :loading="loading"
        :viewBtnNew="null"
        :viewBtnUpdate="true"
      ></Grid>
    </v-card>
    <ModalMessage
      :open="dialogStatus"
      :message="dialogMessage"
      :close="dialogClose"
      :type="dialogType"
    />
  </div>
</template>

<script src="./script.js"></script>
