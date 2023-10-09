<template>
  <v-data-table
    :headers="headers"
    :items="supplierComputed"
    class="elevation-1"
    loading="true"
    loading-text="Loading... Please wait"
    :search="search"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:item.street="{ item }">
      {{ item.street + ', ' + item.city + ' ' + item.country }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Supplier</v-toolbar-title>
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
              New Supplier
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
                      v-model="editedSupplier.company_name"
                      label="Supplier Name"
                      dense
                      prepend-icon="mdi-office-building-outline"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSupplier.street"
                      label="Street"
                      dense
                      prepend-icon="mdi-map-marker-outline"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSupplier.city"
                      label="City"
                      dense
                      prepend-icon="mdi-map-marker-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSupplier.country"
                      label="Country"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedSupplier.contact_number"
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
    suppliers: [],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Supplier Name',
        align: 'start',
        value: 'company_name',
      },
      { text: 'Supplier Code', value: 'code' },
      { text: 'Street', value: 'street' },
      { text: 'Contact Number', value: 'contact_number', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedSupplier: {
      company_name: '',
      street: '',
      city: '',
      country: '',
      contact_number: '',
      code: '',
    },
    defaultSupplier: {
      company_name: '',
      street: '',
      city: '',
      country: '',
      contact_number: '',
    },
    // loading: false,
  }),

  computed: {
    ...mapGetters({
      supplierList: 'allSupplier',
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Supplier' : 'Edit Supplier'
    },
    supplierComputed() {
      return this.supplierList[0]
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
    this.getSuppliers()
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.suppliers.indexOf(item)
      this.editedSupplier = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.suppliers.indexOf(item)
      this.editedSupplier = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.suppliers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedSupplier = Object.assign({}, this.defaultSupplier)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedSupplier = Object.assign({}, this.defaultSupplier)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editSupplier()
      } else {
        this.addNewSupplier()
      }
      this.close()
    },
    async getSuppliers() {
      await this.$store.dispatch('getSupplierList', {}).then(
        (result) => {
          this.suppliers = result
        },
        (error) => {
          console.log('err', error)
        }
      )
    },
    async addNewSupplier() {
      await this.$store
        .dispatch('addSupplier', {
          suppname: this.editedSupplier.company_name,
          street: this.editedSupplier.street,
          city: this.editedSupplier.city,
          country: this.editedSupplier.country,
          contact: this.editedSupplier.contact_number,
          code: this.editedSupplier.code,
        })
        .then(
          (res) => {
            this.getSuppliers()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    async editSupplier() {
      await this.$store
        .dispatch('patchSupplier', {
          supname: this.editedSupplier.company_name,
          street: this.editedSupplier.street,
          city: this.editedSupplier.city,
          country: this.editedSupplier.country,
          contact: this.editedSupplier.contact_number,
          code: this.editedSupplier.code,
        })
        .then(
          (res) => {
            this.getSuppliers()
          },
          (error) => {
            console.log(error)
          }
        )
    },
  },
}
</script>
