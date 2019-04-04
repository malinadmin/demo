import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  CarlistNumber: [], // 选择车辆的例表个数
  times:[], //时间集合
}
const mutations = {
  hide(state,num) {  //同上
    state.CarlistNumber = num;
  },
  gettime(state,num){ //获取时间
    state.times = num;
  }
};
const actions = {
  changeNum(context,num) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('hide',num);
  },
  changtime(context,num) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('gettime',num);
  },
};

//我每次要改 state里边的值的时候 我就调用 this.$store.dispatch('changeNum',66)
// state.num 就等于66 了
//你this.store.state.num   就看到了
export default new Vuex.Store({
  state,
  mutations,
  actions
})
