<template>
  <div>
    <TopBar title="Dashboard"></TopBar>
    <v-container>
      <v-card>
        <v-row class="pa-2">
          <v-col md="4">
            <CardHome
              linkText="Acessar"
              :linkAct="actCliente"
              title="Clientes"
              color="indigo darken-3"
              urlImage="//images.hypeti.com.br/cliente.jpg"
            >
              Visualizar dados do cliente. <br />
              Cadastro de clientes, fazendas e mapas da area.
            </CardHome>
          </v-col>
          <v-col md="4">
            <CardHome
              linkText="Acessar"
              :linkAct="actTimeCourse"
              title="Período"
              color="purple darken-4"
              urlImage="//images.hypeti.com.br/calendario.jpg"
            >
              Visualizar período. Cadastro do período que os dados devem ser
              lançados
            </CardHome>
          </v-col>
          <v-col md="4">
            <CardHome
              color="cyan darken-1"
              linkText="Acessar"
              :linkAct="actStatic"
              title="Nível Estático"
              urlImage="//images.hypeti.com.br/estatico.jpg"
            >
              Lançamento / Nível estático<br />
              Lançamentos dos dados de medição dos niveis de água
            </CardHome>
          </v-col>
          <v-col md="4">
            <CardHome
              color="blue"
              linkText="Acessar"
              :linkAct="actRuler"
              title="Nível Régua"
              urlImage="//images.hypeti.com.br/regua.png"
            >
              Lançamento / Nível régua<br />
              Lançamentos dos dados de medição dos niveis de água
            </CardHome>
          </v-col>
          <v-col md="4">
            <CardHome
              color="teal"
              linkText="Acessar"
              :linkAct="actReport"
              title="Relatórios"
              urlImage="//images.hypeti.com.br/relatorio.jpg"
            >
              Gerar relatórios estatisticos, gráficos Dados detalhados das
              informações cadastradas no sistema
            </CardHome>
          </v-col>

          <v-col md="4">
            <CardHome
              linkText="Acessar"
              :linkAct="actUser"
              title="Usuário"
              color="orange darken-3"
              urlImage="//images.hypeti.com.br/usuario.jpeg"
            >
              Criar, editar e bloquear usuário. Definir acessos<br />
              Incluse acesso ao App
            </CardHome>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script src="~/services/home/script.js"></script>
