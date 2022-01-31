<template>
  <v-card class="ma-2" outlined tile>
    <v-system-bar color="primary" dark height="40">
      <span>Listagem de lançamento</span>
      <v-divider />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark @click="updateAct" v-on="on" v-bind="attrs">
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
        </template>
        Atualizar dados
      </v-tooltip>
    </v-system-bar>
    <v-list three-line dense class="mx-2">
      <v-card outlined class="pa-4">
        <v-row>
          <v-col
            ><strong>Horimetro / Limite dia:</strong> {{ limitHour }}
          </v-col>
          <v-col
            ><strong>Hidrometro / limite dia:</strong>
            {{ limitHidrometer }}</v-col
          >
          <v-col
            ><strong>Horimetro / Total mês:</strong>
            {{ limitHidrometer }}</v-col
          >
          <v-col
            ><strong>Hidrometro / Total mês:</strong>
            {{ limitHidrometer }}</v-col
          >
        </v-row>
      </v-card>

      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-title
                >Lançamento do dia
                <strong>{{ item.calculationDateBR }}</strong>
                <v-chip class="ma-2" outlined dark :color="item.colorHour">
                  <v-icon>{{ item.iconHour }}</v-icon>
                  <span class="ml-2">Horimetro</span>
                </v-chip>

                <v-chip class="ma-2" outlined dark :color="item.colorHorimeter">
                  <v-icon>{{ item.iconHorimeter }}</v-icon>
                  <span class="ml-2">Hidrometro</span>
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-row>
                  <v-col md="2" sm="6" class="text-center">
                    Hidrometro <br />
                    <strong>{{ item.hydrometerValue }}</strong>
                  </v-col>

                  <v-col md="2" sm="6" class="text-center">
                    Horimetro <br />
                    <strong>{{ item.hourmeterValue }}</strong>
                  </v-col>

                  <v-col md="1" class="text-center">
                    M&sup3;/Dia <br />
                    <strong>{{ item.cubicMeterDay }}</strong>
                  </v-col>

                  <v-col md="1" class="text-center">
                    H/Dia <br />
                    <strong>{{ item.hoursDay }}</strong>
                  </v-col>

                  <v-col md="2" class="text-center">
                    Média Captada <br />
                    <strong>{{ item.averageCapital }}</strong>
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-row class="pa-3">
                  <v-col class="flex justify-center align-center">
                    <v-divider></v-divider>
                  </v-col>

                  <v-col md="2">
                    <v-btn color="red" dark small @click="deleteAct(item)">
                      <v-icon>mdi-delete</v-icon>
                      <span>Excluir</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="'div-' + item.id" color="primary" />
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script src="./script.js"></script>
