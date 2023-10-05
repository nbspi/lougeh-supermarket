<template>
  <v-sheet class="mx-auto">
    <v-slide-group v-model="model" class="pa-3" center-active show-arrows>
      <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-3"
          height="100"
          width="200"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
