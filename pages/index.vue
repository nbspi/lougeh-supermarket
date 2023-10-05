<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10">
      <v-switch
        dense
        v-model="$vuetify.theme.dark"
        label="Dark"
        persistent-hint
      ></v-switch>
      <Header class="mb-5" />
      <Carousels />
      <Slides />
      <ProductTabs />
      <Footer />
    </v-col>
  </v-row>
</template>

<script>
import ProductTabs from '~/components/ProductTabs.vue'

export default {
  name: 'IndexPage',
  components: { ProductTabs },
}
</script>
