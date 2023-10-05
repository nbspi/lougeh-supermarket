<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-card>
      <v-navigation-drawer app v-model="drawer" permanent>
        <v-list-item class="px-2" active-class="activeNav">
          <!-- <v-img
              class="mx-auto"
              max-height="123"
              max-width="123"
              src="/imgs/2.png"
            ></v-img> -->
          <v-avatar>
            <img src="/imgs/iris.jpg" alt="John" />
          </v-avatar>
        </v-list-item>
        <v-list-item class="px-2" active-class="activeNav">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold h2"
              >Lougeh si Myles</v-list-item-title
            >
            <v-list-item-subtitle> Prototype </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense rounded>
          <v-list-item
            active-class=""
            v-for="item in items"
            :key="item.title"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-container>
            <v-switch
              dense
              v-model="$vuetify.theme.dark"
              label="Dark"
              persistent-hint
            ></v-switch>
          </v-container>
        </template>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: 'sideBarLayout',

  data() {
    return {
      drawer: true,
      items: [
        { title: 'Supplier', icon: 'mdi-account', route: '/supplier' },
        {
          title: 'Delivery',
          icon: 'mdi-truck-delivery-outline',
          route: '/delivery',
        },
        { title: 'Item', icon: 'mdi-format-list-bulleted', route: '/item' },
        { title: 'Sales', icon: 'mdi-chart-line', route: '/sales' },
        {
          title: 'Customer',
          icon: 'mdi-account-group-outline',
          route: '/customer',
        },
      ],
      mini: true,
    }
  },
}
</script>
