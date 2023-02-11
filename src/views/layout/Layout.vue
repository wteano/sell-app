<template>
  <div class="layout">
    <header>
      <div class="top">
        <div class="shopname">
          <img src="@/assets/imgs/bg.png" alt="">
          <div>
            <p class="title"><van-tag size="large" color="#f60">品牌</van-tag> {{shopInfo&&shopInfo!.name}}</p>
            <p>{{shopInfo&&shopInfo.description}}/{{shopInfo&&shopInfo.deliveryTime}}分钟送达</p>
            <p><van-tag text-color="#f60" color="#fff">减</van-tag> {{shopInfo&&shopInfo.supports[0]}}</p>
          </div>
          <van-button round color="#343434" icon="arrow" icon-position="right"
            @click="infoShow=(!infoShow)">{{shopInfo&&shopInfo.supports.length}}个</van-button>
        </div>
        <van-notice-bar left-icon="volume-o" :text="shopInfo&&shopInfo.bulletin" background="rgb(0 0 0 / 30%)" color="#fff"
          mode="link">
          <template #left-icon>
            <van-tag size="large" color="#fff" text-color="#000">公告</van-tag>
          </template>
        </van-notice-bar>
      </div>
      <van-tabbar active-color="#ee0a24" inactive-color="#000" border route :fixed="false">
        <van-tabbar-item to="/goods">商品</van-tabbar-item>
        <van-tabbar-item to="/rate">评价</van-tabbar-item>
        <van-tabbar-item to="/shop">商家</van-tabbar-item>
      </van-tabbar>
    </header>
    <div class="main noscrollBar">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-overlay :show="infoShow" @click="infoShow = false">
      <template #default>
        <div class="sellInfo" @click.stop>
          <h1>{{shopInfo&&shopInfo.name}}</h1>
          <div class="score">
            <!-- <van-rate  v-model="score" :value="shopInfo&&shopInfo.score" @input="(data: number)=>{ shopInfo&&(shopInfo.score = data) }" allow-half void-icon="star"  :size="25" color="#ffd21e" void-color="#eee" readonly></van-rate> -->
            <van-rate  v-model="score" allow-half void-icon="star"  :size="25" color="#ffd21e" void-color="#eee" readonly></van-rate>
            <!-- <div class="fullScore" :style="{width:shopInfo?shopInfo.score*20+'%':'80%'}"></div>
            <div class="nullScore"></div> -->
          </div>
          <div class="discount">
            <van-divider>优惠信息</van-divider>
            <div class="disitem" v-for="i in shopInfo?.supports" :key="i">
              <van-tag size="large" color="#fff" :text-color="i.includes('折')?'#0993fe':'#000'">{{i.includes('折')?"折":"惠"}}</van-tag><span>{{ i }}</span>
            </div>
          </div>
          <div class="bulletin">
            <van-divider>商家公告</van-divider>
            <p>{{ shopInfo&&shopInfo.bulletin }}</p>
          </div>
          <van-icon class="close" @click="infoShow=false" name="cross"></van-icon>
        </div>
      </template>
    </van-overlay>
    <shop-car></shop-car>
  </div>
</template>

<script lang="ts">
import { Seller } from '@/type'
import { getSellerApi } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import ShopCar from '@/components/ShopCar.vue'

@Component({
  components: { ShopCar }
})
export default class Layout extends Vue {
  infoShow=false
  shopInfo:Seller|null =null
  score =0

  async initData () {
    const res = await getSellerApi()
    this.shopInfo = res.data
    this.score = this.shopInfo.score
    // console.log(this.shopInfo)
  }

  // infoShow () { return 0 }

  private created () {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

header {
  width: 100%;
  height: 546px;
  background-image: url(@/assets/imgs/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .top {
    position: relative;
    width: 100%;
    height: 420px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;

    .shopname {
      display: flex;
      align-items: center;
      // justify-content: space-around;
      height: 330px;
      color: #fff;

      .title {
        font-size: 45px;
        font-weight: 600;
      }

      &>div p{
        font-size: 35px;
      }
      &>div p:nth-of-type(2){
        margin:20px 0;
        font-size:35px;
      }
       img {
        margin: 0 45px 0 60px;
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
      /deep/.van-button{
        position: relative;
        top: 70px;
        // width: 150px;
        // height: 90px;
        // background-color: #ee0a24;
      }
    }

    /deep/.van-notice-bar {
      height: 90px;
      font-size: 35px;
      // .van-tag{
      //   font-size: 35px;
      //   color: #fff;
      // }
      .van-icon {
        font-size: 30px;
      }
    }
  }

  /deep/.van-tabbar {
    height: 126px;
    border: 3px solid #cbcbcb;
    box-sizing: border-box;
  }

  /deep/.van-tabbar-item {
    font-size: 45px;
    font-weight: 600;
  }
}
.van-overlay{
  padding: 300px 0;
  z-index: 3999;
}
.sellInfo{
  padding:0 100px;
  height: 100%;
  color: #fff;
  font-size: 40px;
  text-align: center;
  h1{
    font-size:60px;
    font-weight: 600;
  }
  .score{
    position: relative;
    margin: 60px auto;
    height: 60px;
    .fullScore,.nullScore{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: url(@/assets/imgs/star.png);
    }
    .fullScore{
      width:100%;
      z-index: 1;
      background-size: 80px  120px;
      background-position: 0 0;
    }
    .nullScore{
      background-size:80px  120px;
      background-position: 0 60px;
    }
  }
  /deep/.van-divider{
    color: #fff;
    font-size: 50px;
    font-weight: 600;
    &::after,&::before{
      border-color: #fff;
      border-width:3px;
    }
  }
  .discount{
    .disitem{
      padding: 20px 0;
      color: #ccc;
      text-align: left;
      /deep/.van-tag{
        margin-right: 40px;
      }
    }
  }
  .bulletin{
    p{
      line-height: 80px;
      text-align: left;
      color: #ccc;
    }
  }
  .close {
    margin-top: 100px;
    font-size: 100px;
  }
}
.main {
  width: 100%;
  height: calc(100vh - 276px);
}
</style>
