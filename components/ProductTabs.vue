<template>
  <v-card flat>
    <v-tabs color="red darken-4" right>
      <v-tab>Landscape</v-tab>
      <v-tab>City</v-tab>
      <v-tab>Abstract</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
                class="mb-5"
              ></v-img>
              <v-row class="mx-1">
                <p class="font-weight-bold">Product Name</p>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn small depressed color="primary"> Add to cart </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-col
                  ><v-btn icon small>
                    <v-icon color="red"> mdi-heart-outline </v-icon></v-btn
                  ></v-col
                >
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
