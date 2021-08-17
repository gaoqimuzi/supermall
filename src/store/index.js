import Vue from "vue";
import Vuex from 'vuex';
import getters from'./getters.js';
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex);
const store = new Vuex.Store({
    //相当于data
    state: {
        cartList: []
    },
    //
    getters,
    //mutations的唯一目的就是修改state中的状态
    mutations,
    actions,
})
export default store;