<template>
  <v-data-table
    :headers="headers"
    :items="deliveryComputed"
    class="elevation-1"
    loading="false"
    loading-text="Loading... Please wait"
    :search="search"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:item.timestamp="{ item }">
      {{ formatDate(item.timestamp) }}
    </template>
    <template v-slot:item.price="{ item }">
      {{ formatCurrency(item.price) }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Delivery</v-toolbar-title>
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
              New Delivery
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
                    {{ editedDelivery.code }}
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
                    {{ editedDelivery.description }}
                    <v-select
                      dense
                      v-model="editedDelivery.description"
                      :items="itemComputed"
                      :item-text="'item_description'"
                      :item-value="'code'"
                      menu-props="auto"
                      label="Select Item"
                      prepend-icon="mdi-format-list-bulleted"
                      return-object
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedDelivery.description"
                      label="Item Description"
                      dense
                      prepend-icon="mdi-package-variant-closed"
                    ></v-text-field>
                  </v-col>
                </v-row> -->

                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedDelivery.price"
                      label="Cost"
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
    sortBy: 'timestamp',
    sortDesc: true,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Transaction ID',
        value: 'tranid',
        align: 'start',
        sortable: true,
      },
      { text: 'Supplier Code', value: 'code', align: 'start', sortable: false },
      { text: 'Item Description', value: 'description', sortable: false },
      { text: 'Cost', value: 'price', sortable: false },
      { text: 'Date Received', value: 'timestamp', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    deliveries: [],
    editedIndex: -1,
    editedDelivery: {
      supplierCode: '',
      itemCode: '',
      qty: 0,
      price: 0,
    },
    defaultDelivery: {
      supplierCode: '',
      itemCode: '',
      qty: 0,
      price: 0,
    },
  }),

  computed: {
    ...mapGetters({
      deliveryList: 'allDelivery',
      supplierList: 'allSupplier',
      itemList: 'allItem',
    }),
    deliveryComputed() {
      return this.deliveryList[0]
    },
    supplierComputed() {
      return this.$store.state.supplierList[0]
    },
    itemComputed() {
      return this.$store.state.itemList[0]
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Delivery' : 'Edit Delivery'
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
  beforeCreate() {
    this.$store.dispatch('getSupplierList')
    this.$store.dispatch('getItemList')
  },
  created() {
    this.initialize()
    this.getDeliveries()
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.deliveries.indexOf(item)
      this.editedDelivery = Object.assign({}, item)
      this.dialog = true
      console.log('edit', this.editedDelivery)
    },

    deleteItem(item) {
      this.editedIndex = this.deliveries.indexOf(item)
      this.editedDelivery = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deliveries.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedDelivery = Object.assign({}, this.defaultDelivery)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedDelivery = Object.assign({}, this.defaultDelivery)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editDelivery()
      } else {
        this.addNewDelivery()
      }

      this.close()
    },
    async getDeliveries() {
      await this.$store.dispatch('getDeliveryList', {}).then(
        (result) => {
          this.deliveries = result
        },
        (error) => {
          console.log('err', error)
        }
      )
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
    async addNewDelivery() {
      await this.$store
        .dispatch('addDelivery', {
          supCode: this.editedDelivery.supplierCode.code,
          itmCode: this.editedDelivery.item.code,
          itmCost: this.editedDelivery.itemCost,
          qty: this.editedDelivery.qty,
        })
        .then(
          (res) => {
            this.getDeliveries()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    async editDelivery() {
      await this.$store
        .dispatch('patchDelivery', {
          supCode: this.editedDelivery.supplierCode.code,
          itmCode: this.editedDelivery.item.code,
          itmCost: this.editedDelivery.itemCost,
          qty: this.editedDelivery.qty,
        })
        .then(
          (res) => {
            this.getDeliveries()
          },
          (error) => {
            console.log(error)
          }
        )
    },
  },
}
</script>
