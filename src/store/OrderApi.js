import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      newOrderCreated:[],
  },
  getters: {
      getNewOrder: (state) => state.newOrderCreated,
  },
  mutations: {
    async setNewOrder(state, { res }){
      state.newOrderCreated = (await res)
    },
  },
  actions: {
    async createOrder({ commit } , payload){
        try {
            let header = AuthService.getApiHeader();
            // console.log("header = ", header)
            let res = await backendInstance.post(`/api/order`, payload , header);
            // console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewOrder', res.data)
              console.log(res.data)
              return {
                success: true,
              };
            }
          } catch (e) {
            //console.log(payload)
            return {
              success: false,
              message: "ตรวจสอบฟอร์มกรอกข้อมูลอีกครั้ง",
            };
          }
    },
  },
  modules: {
  }
})
