<template>
  <v-card outlined :color="color" dark>
    <v-img :src="urlImage" height="150px" aspect-ratio="2" />
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">
        <slot />
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="orange lighten-2 primary" text @click="linkAct">
        {{ linkText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script src='./script.js'></script>
