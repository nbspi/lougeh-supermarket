<template>
  <v-data-table
    :headers="headers"
    :items="customerComputed"
    sort-by="calories"
    class="elevation-1"
    loading="false"
    loading-text="Loading... Please wait"
    :search="search"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:item.firstname="{ item }">
      {{ item.firstname + ' ' + item.lastname }}
    </template>
    <template v-slot:item.street="{ item }">
      {{ item.street + ',' + item.city + ' ' + item.country }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Customer</v-toolbar-title>
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
              New Customer
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
                    <v-text-field
                      v-model="editedCustomer.firstname"
                      label="First Name"
                      dense
                      prepend-icon="mdi-account-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedCustomer.lastname"
                      label="Last Name"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedCustomer.street"
                      label="Street"
                      dense
                      prepend-icon="mdi-map-marker-outline"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedCustomer.city"
                      label="City"
                      dense
                      prepend-icon="mdi-map-marker-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedCustomer.country"
                      label="Country"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedCustomer.contact_number"
                      label="Contact Number"
                      dense
                      prepend-icon="mdi-cellphone-basic"
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
export default {
  data: () => ({
    sortBy: 'code',
    sortDesc: true,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Customer Name',
        align: 'start',
        value: 'firstname',
      },
      {
        text: 'Customer Code',
        align: 'start',
        value: 'code',
      },
      { text: ' Address', value: 'street' },
      // { text: 'Fat (g)', value: 'fat' },
      // { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Contact Number', value: 'contact_number', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedCustomer: {
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      country: '',
      contactNumber: '+63',
    },
    defaultCustomer: {
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      country: '',
      contactNumber: '+63',
    },
  }),

  computed: {
    ...mapGetters({
      customerList: 'allCustomer',
    }),
    customerComputed() {
      return this.customerList[0]
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
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
    this.getCustomer()
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedCustomer = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedCustomer = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.customers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedCustomer = Object.assign({}, this.defaultCustomer)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedCustomer = Object.assign({}, this.defaultCustomer)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editCustomer()
      } else {
        this.addNewCustomer()
      }
      this.close()
    },
    async getCustomer() {
      await this.$store.dispatch('getCustomerList', {}).then(
        (result) => {
          this.customers = result
        },
        (error) => {
          console.log('err', error)
        }
      )
    },
    async addNewCustomer() {
      await this.$store
        .dispatch('addCustomer', {
          fname: this.editedCustomer.firstname,
          lname: this.editedCustomer.lastname,
          street: this.editedCustomer.street,
          city: this.editedCustomer.city,
          country: this.editedCustomer.country,
          contact: this.editedCustomer.contactNumber,
        })
        .then(
          (res) => {
            this.getCustomer()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    async editCustomer() {
      console.log(' this.editedCustomer', this.editedCustomer)
      await this.$store
        .dispatch('patchCustomer', {
          first: this.editedCustomer.firstname,
          last: this.editedCustomer.lastname,
          street: this.editedCustomer.street,
          city: this.editedCustomer.city,
          country: this.editedCustomer.country,
          contact: this.editedCustomer.contactNumber,
          code: this.editedCustomer.code,
        })
        .then(
          (res) => {
            this.getCustomer()
          },
          (error) => {
            console.log(error)
          }
        )
    },
  },
}
</script>
