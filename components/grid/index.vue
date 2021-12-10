<template>
  <v-col :cols="cols" class="div-grid">
    <v-data-table
      id="idDataTable"
      :hide-default-header="hidedefaultheader"
      :group-by="groupby"
      :headers="headers"
      :items="items"
      class="elevation-1"
      :search="search"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 15, 30, 50, 100, -1],
        'items-per-page-text': 'Registros por página ',
      }"
      :custom-filter="pesquisarGRID"
    >
      <template v-slot:top>
        <div v-if="titulo !== ''">
          <v-toolbar
            v-if="titulo"
            flat
            dark
            dense
            :outlined="true"
            :color="toolbarColor"
          >
            <v-toolbar-title>{{ titulo }}</v-toolbar-title>
            <div class="btn-download-dados">
              <vue-json-to-csv
                v-if="exportarExcel === true && items.length > 0"
                :json-data="items"
                :csv-title="getDate()"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success"
                      class="mr-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <i class="mdi mdi-download" aria-hidden="true"></i>
                      <!--                  EXPORTAR DADOS-->
                    </v-btn>
                  </template>
                  <span>Exportar dados</span>
                </v-tooltip>
              </vue-json-to-csv>

              <v-tooltip bottom v-if="viewBtnNew !== null">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    class="mr-2"
                    @click="handleBtnNovo"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <i class="mdi mdi-plus" aria-hidden="true"></i>
                    <!--                  ADICIONAR NOVO-->
                  </v-btn>
                </template>
                <span>Adicionar novo</span>
              </v-tooltip>

              <v-tooltip bottom v-if="viewBtnUpdate != null">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="light"
                    class="mr-2"
                    @click="handleBtnAtualizar"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon> mdi-refresh </v-icon>
                    <!--                  ATUALIZAR-->
                  </v-btn>
                </template>
                <span>Atualizar dados</span>
              </v-tooltip>
            </div>
          </v-toolbar>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-text-field
            v-model="search"
            label="Pesquisar"
            class="mx-4"
            outlined
            dense
          ></v-text-field>
        </div>
      </template>
      <template v-slot:item.acoes="{ item }">
        <v-tooltip bottom v-for="acao in actions" v-bind="acao" :key="acao.id">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              class="mr-2"
              :color="acao.color"
              @click="detalharAction(acao, item)"
            >
              {{ acao.icon }}
            </v-icon>
          </template>
          {{ acao.tooltip }}
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>
<script type="text/javascript" src="./script.js" />
<style lang="scss" src="./style.scss" />
