import Vue from 'vue'
import Vuex from 'vuex'
import { Food } from '@/type'
// import { deepClone } from '@/utils/common.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carList: [],
    totalPrice: 0,
    totalNum: 0,
    goods: {}
  },
  getters: {
  },
  mutations: {
    // 商品详情
    goodsInfo (state, goods:Food) {
      state.goods = goods
      // console.log(state.goods)
    },
    // 添加商品到购物车
    goodsAdd (state, item) {
      // console.log(item)
      const carList = state.carList as Array<Food>
      const index = carList.findIndex(food => food.id === item.id)
      if (index === -1) {
        // const obj = JSON.parse(JSON.stringify(item))
        // obj.num++
        item.num++
        carList.push(item)
      } else {
        (carList[index].num as number)++
      }
      state.totalPrice = Number((state.totalPrice + item.price).toFixed(2))
      state.totalNum++
      // console.log(state.cateList)
    },
    // 删除购物车商品
    goodsReduce (state, item) {
      const carList = state.carList as Array<Food>
      const index = carList.findIndex(food => food.id === item.id)
      if (carList[index].num && carList[index].num === 1) {
        item.num--
        carList.splice(index, 1)
      } else {
        (carList[index].num as number)--
      }
      state.totalPrice = Number((state.totalPrice - item.price).toFixed(2))
      state.totalNum--
      // console.log(state.totalPrice)
      // console.log(state.carList)
    },
    // 清空购物车
    clearCarList (state) {
      const carList = state.carList as Array<Food>
      carList.forEach(item => { item.num = 0 })
      // carList.splice(0, carList.length)
      state.carList = []
      // console.log(state.carList)
      state.totalNum = 0
      state.totalPrice = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
