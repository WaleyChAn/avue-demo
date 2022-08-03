import Vue from 'vue'
import Vuex from 'vuex'
import { getEntityFields } from '../api/entityFields'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entityFields: []
  },
  getters: {
    entityFields: state => state.entityFields
  },
  mutations: {
    SET_ENTITY_FIELDS: (state, list) => {
      state.entityFields = list
    }
  },
  actions: {
    async fetchEntityFields ({ commit }) {
      const res = await getEntityFields()
      if (res) {
        commit('SET_ENTITY_FIELDS', res)
      }
      return res
    }
  }
})
