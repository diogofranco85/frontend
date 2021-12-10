import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_PLACES_KEY,
    libraries: 'drawing,visualization',
    language: 'pt-BR'
  }
})
