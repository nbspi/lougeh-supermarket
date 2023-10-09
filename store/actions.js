import axios from 'axios'
import moment from 'moment'

// LOGIN
export default {
  async getSupplierList({ commit }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/supplier`,
    }).then((res) => {
      commit('GET_SUPPLIER_LIST', res.data.data)
      return res.data.data
    })
  },
  async getDeliveryList({ commit }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/delivery`,
    }).then((res) => {
      commit('GET_DELIVERY_LIST', res.data.data)
      return res.data.data
    })
  },
  async getItemList({ commit }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/item`,
    }).then((res) => {
      commit('GET_ITEM_LIST', res.data.data)
      return res.data.data
    })
  },
  async getSalesList({ commit }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/sales`,
    }).then((res) => {
      commit('GET_SALES_LIST', res.data.data)
      return res.data.data
    })
  },
  async getCustomerList({ commit }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/customer`,
    }).then((res) => {
      commit('GET_CUSTOMER_LIST', res.data.data)
      return res.data.data
    })
  },
  async addSupplier({ commit }, { suppname, street, city, country, contact }) {
    await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/supplier`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        suppname,
        street,
        city,
        country,
        contact,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async patchSupplier(
    { commit },
    { supname, street, city, country, contact, code }
  ) {
    await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/supplier/patch/${code}`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        supname,
        street,
        city,
        country,
        contact,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async addDelivery({ commit }, { supCode, itmCode, itmCost, qty }) {
    await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/delivery`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        supCode,
        itmCode,
        itmCost,
        qty,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async patchDelivery({ commit }, { qty, supCode, itmCode, itmCost, tranid }) {
    console.log('tt', itmCost)
    await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/delivery/patch/${tranid}`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        supCode,
        itmCode,
        itmCost,
        qty,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async addCustomer(
    { commit },
    { fname, lname, street, city, country, contact, addressid }
  ) {
    await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/customer`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        fname,
        lname,
        street,
        city,
        country,
        contact,
        addressid,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async patchCustomer(
    { commit },
    { first, last, street, city, country, contact, code }
  ) {
    console.log('code', code)
    await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/customer/patch/${code}`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        first,
        last,
        street,
        city,
        country,
        contact,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async addSales({ commit }, { code, cusCode, itmCode, qty, itmCost }) {
    await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/sales`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        cusCode,
        itmCode,
        qty,
        itmCost,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
  async patchSales({ commit }, { code, stransid, itmCode, qty, itmCost }) {
    console.log('code', itmCode, qty)
    await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/sales/patch/${stransid}`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        itmCode,
        qty,
        itmCost,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },

  async patchItem(
    { commit },
    { code, itmDescription, itmBarcode, itmUom, itmPrice }
  ) {
    console.log('code', code)
    await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/item/patch/${code}`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        itmDescription,
        itmBarcode,
        itmUom,
        itmPrice,
      },
    }).then((res) => {
      //   commit('GET_SUPPLIER_LIST', res.data.msg)
      return res.data.msg
    })
  },
}
