<template>
  <v-card height="">
    <Login v-if="loginDialog" />
    <!-- img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg" -->
    <v-toolbar dense prominent flat class="pt-5">
      <!-- <p>LouGeh</p> -->
      <v-text-field
        class=""
        rounded
        solo
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-btn icon color="primary">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn icon color="red">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn icon @click="loginDialog = !loginDialog">
        <v-avatar>
          <v-icon> mdi-account-circle </v-icon>
        </v-avatar>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-divider></v-divider>
    <v-toolbar dense flat class="">
      <v-row no-gutters align="center" justify="spacea">
        <v-col cols="1">
          <v-btn icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col cols="2">
          <p class="text-center">New Products</p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <p class="pl-6 text-left">New Products</p>
        </v-col>

        <v-col>
          <p class="pr-5 text-right">New Products</p>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loginDialog: false,
    }
  },
}
</script>

<!-- <style lang="sass" scoped>

p{
    border: 1px solid red
    }
</style> -->
