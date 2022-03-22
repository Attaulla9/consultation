import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '',
    phone: '',
    bmi: '',
    Date: '',
    Time: ''
  },
  getters: {
  },
  mutations: {
    UPDATESLOT(state,payload){
      state.Date=payload.date;
      state.Time=payload.time
      console.log(state.Date)
    }
  },
  actions: {
    updateSlot({commit},payload){
      commit('UPDATESLOT',payload)
    }
  },
  modules: {
  }
})
