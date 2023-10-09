<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
    loading="false"
    loading-text="Loading... Please wait"
    :search="search"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Item</v-toolbar-title>
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
              New Item
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
                      v-model="editedItem.item_description"
                      label="Item Description"
                      dense
                      prepend-icon="mdi-format-list-bulleted"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedItem.barcode"
                      label="Barcode"
                      dense
                      prepend-icon="mdi-barcode"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-select
                      :items="itemUom"
                      item-value="value"
                      item-text="uomname"
                      v-model="editedItem.uom_id"
                      label="Unit of Measurement"
                      dense
                      prepend-icon="mdi-scale"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="">
                    <v-text-field
                      v-model="editedItem.price"
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
export default {
  data: () => ({
    sortBy: 'code',
    sortDesc: true,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Item Code',
        align: 'start',
        value: 'code',
      },
      {
        text: 'Item Description',
        align: 'start',
        value: 'item_description',
      },
      { text: 'Barcode', value: 'barcode' },
      // { text: 'Fat (g)', value: 'fat' },
      // { text: 'Carbs (g)', value: 'carbs' },
      { text: 'UOM Description', value: 'description' },
      { text: 'UOM ID', value: 'uom_id' },
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
    itemUom: [
      { uomname: 'Piece', value: '1' },
      { uomname: 'Pack', value: '2' },
      { uomname: 'Box', value: '3' },
      { uomname: 'Bag', value: '4' },
      { uomname: 'Can', value: '5' },
    ],
    editedIndex: -1,
    editedItem: {
      item_description: '',
      barcode: '',
      uom_id: '',
      price: 0,
      code: '',
    },
    defaultItem: {
      description: '',
      barcode: '',
      uom: '',
      price: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    this.getItem()
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log('object, ', this.editedItem)
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.items.splice(this.editedIndex, 1)
      this.deleteItems()
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editItems()
      } else {
        // this.items.push(this.editedItem)
        this.addNewItem()
      }
      this.close()
    },
    async getItem() {
      await this.$store.dispatch('getItemList', {}).then(
        (result) => {
          this.items = result
          console.log(this.items, 'etst')
        },
        (error) => {
          console.log('err', error)
        }
      )
    },
    async editItems() {
      await this.$store
        .dispatch('patchItem', {
          itmDescription: this.editedItem.item_description,
          itmBarcode: this.editedItem.barcode,
          itmUom: this.editedItem.uom_id,
          itmPrice: this.editedItem.price,
          code: this.editedItem.code,
        })
        .then(
          (res) => {
            this.getItem()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    async deleteItems() {
      await this.$store
        .dispatch('deleteItem', {
          itmDescription: this.editedItem.item_description,
          itmBarcode: this.editedItem.barcode,
          itmUom: this.editedItem.uom_id,
          itmPrice: this.editedItem.price,
          code: this.editedItem.code,
        })
        .then(
          (res) => {
            this.getItem()
          },
          (error) => {
            console.log(error)
          }
        )
    },

    async addNewItem() {
      await this.$store
        .dispatch('addItem', {
          itmDescription: this.editedItem.item_description,
          itmBarcode: this.editedItem.barcode,
          itmUom: this.editedItem.uom_id,
          itmPrice: this.editedItem.price,
        })
        .then(
          (res) => {
            this.getItem()
          },
          (error) => {
            console.log(error)
          }
        )
    },
  },
}
</script>
