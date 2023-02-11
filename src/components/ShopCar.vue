<template>
    <div class="footer">
        <footer>
            <div class="carBtn" @click="carList.length ? show = !show : show = false">
                <div class="carbg">
                    <div class="box carFont" :class="carList.length ? 'active' : ''">
                        <!-- <i class="van-icon van-icon-shopping-cart-o"></i> -->
                        <van-icon name="shopping-cart-o" :badge="totalNum ? totalNum : ''"></van-icon>
                    </div>
                </div>
                <span class="total" :class="totalPrice && carList.length ? 'fw' : ''">{{ totalPrice?'￥'+totalPrice: '未选购商品'}}</span>
            </div>
            <van-button class="settleBtn" :class="carList.length ? 'active' : ''" color="#2b343b">{{
                carList.length &&
                    totalPrice >= 20 ? '去结算' : '￥20起送'
            }}</van-button>
        </footer>
        <van-action-sheet v-model="show" overlay get-container="body">
            <div class="shoppingCar">
                <div class="carTop">
                    <div class="carTitle">已选商品</div>
                    <div class="clear" @click="clear">清空</div>
                </div>
                <div class="carList">
                    <div class="item" v-for="item in carList" :key="item.id">
                        <div class="title">{{ item.name }}</div>
                        <div class="price">￥{{ item.num && (item.num * item.price).toFixed(2) }}</div>
                        <van-stepper v-model="item.num" theme="round" min="0" :show-input="item.num != 0 ? true : false"
                            :show-minus="item.num != 0 ? true : false" button-size="22" @plus="addGoods(item)"
                            @minus="reduceGoods(item)" disable-input />
                    </div>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Food } from '@/type'
@Component
export default class ShopCar extends Vue {
    show=false;

    // 点击添加商品
    addGoods (item:Food) {
      this.$store.commit('goodsAdd', item)
      this.$forceUpdate()
    }

    // 点击减少商品
    reduceGoods (item:Food) {
      if (item.num && item.num < 1) {
        item.num = 0
        return
      }
      this.$store.commit('goodsReduce', item)
      !this.carList.length && (this.show = false)
      this.$forceUpdate()
    }

    clear () {
      this.$store.commit('clearCarList')
      this.show = false
      this.$forceUpdate()
    }

    get totalNum () { return this.$store.state.totalNum as number }

    get carList () { return this.$store.state.carList as Array<Food> }

    get totalPrice () { return this.$store.state.totalPrice as number }
}
</script>

<style lang="less" scoped>
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3000;
}
footer {
  position: relative;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1080px;
  height: 150px;
  background-color: #131d27;
  color: #828b92;
.active{
  background-color: #3191e8 !important;
  color: #fff;
  span{
    color: #fff!important;
  }
}
.fw{
  color: #fff;
}
  .carBtn {
    width: calc(100vw - 300px);
  }

  .carbg {
    z-index: 9;
    position: absolute;
    top: -35px;
    left: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #131d27;

    .box {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #2b333e;
      text-align: center;

      i {
        font-size: 80px;
        line-height: 120px;
      }
    }
  }

  .total {
    margin-left: 240px;
    line-height: 140px;
    font-size: 40px;
  }

  .van-button/deep/ {
    width: 300px;
    height: 100%;
    float: right;
    border: 0;

    span {
      color: #828b92;
      font-weight: 500;
      font-size: 50px;
    }

  }
}
.shoppingCar {
  padding: 0 60px 40px;
  min-height: 810px;
  margin-bottom: 150px;
  .carTop{
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    font-size: 50px;
  }
  .carList{
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 40px;
      padding: 60px 0;
      border-bottom: 3px solid #eee;
      .title{
        width: 480px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
