<template>
  <div class="sell">
    <div class="content">
      <div class="sellname">
        <h1>{{ seller.name }}</h1>
        <div class="dpflex">
          <div class="dpflex">
            <van-rate  v-model="seller.score" allow-half void-icon="star" color="#ffd21e" void-color="#eee" readonly></van-rate>
            <div class="">({{ seller.sellCount }})</div>
            <div class="">月售{{ seller.sellCount }}单</div>
          </div>
          <div class="saveBtn">已收藏</div>
        </div>
      </div>
      <div class="delivery">
        <div class="minPrice"><p>起送价</p><h3>{{seller.minPrice}}<span>元</span></h3></div>
        <div class="deliveryPrice"><p>商家配送</p><h3>{{seller.deliveryPrice}}<span>元</span></h3></div>
        <div class="deliveryTime"><p>平均送达时间</p><h3>{{seller.deliveryTime}}<span>分钟</span></h3></div>
      </div>
      <div class="bulletin">
        <h3>公告与活动</h3>
        <p>{{ seller.bulletin }}</p>
        <div class="disitem" v-for="i in seller.supports" :key="i">
            <van-tag size="large" :color="i.includes('折')?'#0993fe':'#333'" text-color="#fff">{{i.includes('折')?"折":"惠"}}</van-tag><span>{{ i }}</span>
        </div>
      </div>
      <div class="sellerImg">
        <h3>商家实景</h3>
        <div class="imgBox">
          <img v-for="i in seller.pics" :key="i" :src="i" alt="" srcset="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getSellerApi } from '@/api'
import BScroll from '@better-scroll/core'

@Component
export default class Shoper extends Vue {
  seller:any = {}
  async getSeller () {
    const { data } = await getSellerApi()
    this.seller = data
    // console.log(data)
    this.$nextTick(() => this.pjscroll())
  }

  // 滚动
  pjscroll () {
    const Evaluate = document.querySelector('.sell')
    const bs = new BScroll(Evaluate as HTMLElement, {
      scrollY: true,
      click: true
    })
    return bs
  }

  // 创建完成
  private created () {
    this.getSeller()
  }
}
</script>

<style lang="less" scoped>
.sell{
  box-sizing: border-box;
  padding:60px 60px 150px ;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .sellname{
    height: 246px;
    border-bottom: 3px solid #ededed;
    color: #888;
    h1{
      font-size: 50px;
      color: #333333;
    }
    .dpflex{
      justify-content: space-between;
      align-items: center;
      &>div>div{
        margin-right: 30px;
      }
      /deep/.van-rate .van-icon{
        font-size: 45px;
      }
      .saveBtn{
        margin:40px 0;
      }
    }
  }
  .delivery{
    padding:60px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    p{
      margin-bottom: 25px;
      font-size: 35px;
      color: #888;
    }
    h3{
      font-size: 45px;
      span{
        font-size: 35px;
      }
    }

  }
  h3{
      font-size: 45px;
      margin-bottom: 45px;
    }
  .bulletin{
    p{
      padding: 0 50px;
      line-height: 70px;
      font-size: 40px;
      font-weight: 500;
      color: #f03814;
    }
    .disitem{
      padding: 20px 0;
      color: #333;
      text-align: left;
      font-size: 40px;
      /deep/.van-tag{
        margin-right: 40px;
      }
    }
  }
  .sellerImg{
    margin-top: 100px;
    .imgBox{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    img{
      margin: 0 0 30px 0;
      width: 300px;
      height: 300px;
      object-fit: contain;
      border-radius: 20px;
      box-shadow: 0 0 10px 0 #ccc;
    }
    }
  }
}
</style>
