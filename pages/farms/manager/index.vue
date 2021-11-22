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
    <TopBar title="Gerenciamento de Hidrometro"/>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <GmapMap
      :center="{lng: longitude, lat: latitude}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 350px; border: solid 1px #eee"
    >
      <GmapMarker
        :position="{lng: longitude, lat: latitude}"
        :clickable="false"
        :shape="{coords: [10, 10, 10, 15, 15, 15, 15, 10], type: 'poly'}"
      ></GmapMarker>
    </GmapMap>
    <div>
      <ul>
        <li>{{longitude}}</li>
        <li>{{latitude}}</li>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>
