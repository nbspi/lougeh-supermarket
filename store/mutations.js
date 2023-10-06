export default {
  GET_SUPPLIER_LIST(state, supplier) {
    state.supplierList = []
    state.supplierList.push(supplier)
  },
  GET_DELIVERY_LIST(state, delivery) {
    state.deliveryList = []
    state.deliveryList.push(delivery)
  },
  GET_ITEM_LIST(state, item) {
    state.itemList = []
    state.itemList.push(item)
  },
  GET_SALES_LIST(state, sales) {
    state.salesList = []
    state.salesList.push(sales)
  },
  GET_CUSTOMER_LIST(state, customer) {
    state.customerList = []
    state.customerList.push(customer)
  },
}
