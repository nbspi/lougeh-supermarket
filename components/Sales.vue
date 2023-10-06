<template>
  <v-data-table
    :headers="headers"
    :items="salesComputed"
    sort-by="calories"
    class="elevation-1"
    loading="false"
    loading-text="Loading... Please wait"
    :search="search"
  >
    <template v-slot:item.timestamp="{ item }">
      {{ formatDate(item.timestamp) }}
    </template>
    <template v-slot:item.price="{ item }">
      {{ formatCurrency(item.price) }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Sales</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Sales
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h6">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <!-- <v-text-field
                      v-model="editedSales.customer"
                      label="Customer"
                      dense
                      prepend-icon="mdi-account-outline"
                    ></v-text-field> -->
                    <v-select
                      dense
                      v-model="editedDelivery.code"
                      :items="supplierComputed"
                      :item-text="'company_name'"
                      :item-value="'code'"
                      menu-props="auto"
                      label="Select Supplier"
                      prepend-icon="mdi-account-outline"
                      return-object
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSales.item"
                      label="Item"
                      dense
                      prepend-icon="mdi-format-list-bulleted"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSales.qty"
                      label="Quantity"
                      dense
                      prepend-icon="mdi-package-variant-closed"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSales.price"
                      label="Price"
                      dense
                      prepend-icon="mdi-currency-php"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-toolbar flat>
        <v-row justify="end">
          <v-col cols="4"> </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="green" small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon color="red" small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data: () => ({
    sales: [],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Code',
        align: 'start',
        value: 'code',
      },
      // { text: 'Item', value: 'calories' },
      // { text: 'Fat (g)', value: 'fat' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Price', value: 'price', sortable: false },
      { text: 'Sales Date', value: 'timestamp' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedSales: {
      customer: '',
      item: '',
      qty: '',
      price: 0,
    },
    defaultSales: {
      customer: '',
      item: '',
      qty: '',
      price: 0,
    },
  }),

  computed: {
    ...mapGetters({
      salesList: 'allSales',
    }),
    salesComputed() {
      return this.salesList[0]
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Sales' : 'Edit Sales'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
    this.getSales()
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedSales = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedSales = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedSales = Object.assign({}, this.defaultSales)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedSales = Object.assign({}, this.defaultSales)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedSales)
      } else {
        this.desserts.push(this.editedSales)
      }
      this.close()
    },
    formatDate(date) {
      return moment(date).format('LLL')
    },
    formatCurrency(price) {
      let PHP = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      })
      return PHP.format(price)
    },
    async getSales() {
      await this.$store.dispatch('getSalesList', {}).then(
        (result) => {
          this.sales = result
        },
        (error) => {
          console.log('err', error)
        }
      )
    },
  },
}
</script>
