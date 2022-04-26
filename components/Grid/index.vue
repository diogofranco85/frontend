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
          <v-system-bar
            v-if="titulo"
            flat
            dark
            dense
            height="36"
            :outlined="true"
            :color="toolbarColor"
          >
            <strong>{{ titulo }}</strong>
            <div class="btn-download-dados">
              <vue-json-to-csv
                v-if="exportarExcel === true && items.length > 0"
                :json-data="items"
                :csv-title="getDate()"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="white"
                      class="mr-2"
                      v-bind="attrs"
                      v-on="on"
                      icon
                    >
                      <v-icon>mdi-download</v-icon>
                      <!--                  EXPORTAR DADOS-->
                    </v-btn>
                  </template>
                  <span>Exportar dados</span>
                </v-tooltip>
              </vue-json-to-csv>

              <v-tooltip bottom v-if="viewBtnNew !== null">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="white"
                    class="mr-2"
                    @click="handleBtnNovo"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon>mdi-plus</v-icon>
                    <!--                  ADICIONAR NOVO-->
                  </v-btn>
                </template>
                <span>Adicionar novo</span>
              </v-tooltip>

              <v-tooltip bottom v-if="viewBtnUpdate != null">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="white"
                    class="mr-2"
                    @click="handleBtnAtualizar"
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon>mdi-refresh</v-icon>
                    <!--                  ATUALIZAR-->
                  </v-btn>
                </template>
                <span>Atualizar dados</span>
              </v-tooltip>
            </div>
          </v-system-bar>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-text-field
            v-model="search"
            label="Pesquisar dados"
            class="mx-4"
            prepend-inner-icon="mdi-file-search"
            clearable
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
