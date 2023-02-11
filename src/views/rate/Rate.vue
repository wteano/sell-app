<template>
  <div class="evaluate">
    <div class="content">
      <div class="getRatingApitart">
        <div class="rat_left">
          <h1>{{ sellIofo.score }}</h1>
          <div class="overAll">综合评分</div>
          <p>高于周边商家69.2%</p>
        </div>
        <div class="rat_right">
          <div class="rat_item">
            <p>服务态度</p>
            <van-rate
              v-model="sellIofo.score"
              :size="22"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="rat_item">
            <p>服务态度</p>
            <van-rate
              v-model="sellIofo.score"
              :size="22"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="rat_item">
            <p>送达时间</p>
            <h2>{{ sellIofo.deliveryTime }}分钟</h2>
          </div>
        </div>
      </div>
      <div class="ratingNum">
        <div class="ratingBox">
          <div class="box_item" @click="filterRate(0)" :class="num==0?'active':''"> 全部 {{ratingList0.length}}</div>
          <div class="box_item" @click="filterRate(1)" :class="num==1?'active':''">满意 {{ratingList1.length}}</div>
          <div class="box_item" @click="filterRate(2)" :class="num==2?'active':''">不满意 {{ratingList2.length}}</div>
        </div>
        <div class="onlyRead">
          <van-checkbox v-model="checked" @change="filterChange()" icon-size="26px"></van-checkbox>
          <p>只看有内容的评价</p>
        </div>
      </div>
      <div class="getRatingApi">
        <div class="ratingBox">
          <Evaluate v-for="(item,index) in ratings" :key="index" :Rating="item"></Evaluate>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
import { getRatingApi, getSellerApi } from '@/api'
import { Seller, Rating } from '@/type'
import { getDate } from '@/utils/common'
import Evaluate from '@/components/Evaluate.vue'

@Component({
  components: {
    Evaluate
  }
})
export default class Rate extends Vue {
  checked = true;
  num = 0
  // 评论的列表
  ratings: Array<Rating> = [];
  ratingList: Array<Rating> = [];
  ratingList0: Array<Rating> = [];
  ratingList1: Array<Rating> = [];
  ratingList2: Array<Rating> = [];
  // 商家信息列表
  sellIofo: Seller | any = [];

  // 获取数据
  async getComment () {
    // 评论的数据
    const res = await getRatingApi()
    this.ratingList = res.data
    this.ratingList = this.ratingList.map((item) => {
      item.rateTime = getDate(item.rateTime, 'yyyy/mm/dd')
      return item
    })
    this.ratingList0 = this.ratingList.filter(item => item.text !== '')
    this.ratings = this.ratingList0
    this.ratingList1 = this.ratingList0.filter(item => item.rateType === 0)
    this.ratingList2 = this.ratingList0.filter(item => item.rateType === 1)
    // console.log(this.ratingList)
    const res1 = await getSellerApi()
    this.sellIofo = res1.data
    // console.log(this.sellIofo)
    this.$nextTick(() => this.pjscroll())
  }

  //
  filterChange () {
    if (this.checked === true) {
      this.ratingList0 = this.ratingList.filter(item => item.text !== '')
    } else {
      this.ratingList0 = this.ratingList
    }
    this.ratingList1 = this.ratingList0.filter(item => item.rateType === 0)
    this.ratingList2 = this.ratingList0.filter(item => item.rateType === 1)
    if (this.num === 0) {
      this.ratings = this.ratingList0
    } else if (this.num === 1) {
      this.ratings = this.ratingList1
    } else if (this.num === 2) {
      this.ratings = this.ratingList2
    }
  }

  // 筛选评论
  filterRate (num:number) {
    this.num = num
    if (this.checked === true) {
      if (num === 0) {
        this.ratings = this.ratingList0
      } else if (num === 1) {
        this.ratings = this.ratingList1
      } else if (num === 2) {
        this.ratings = this.ratingList2
      }
    } else {
      if (num === 0) {
        this.ratings = this.ratingList0
      } else if (num === 1) {
        this.ratings = this.ratingList1
      } else if (num === 2) {
        this.ratings = this.ratingList2
      }
    }
  }

  // 滚动
  pjscroll () {
    const Evaluate = document.querySelector('.evaluate')
    const bs = new BScroll(Evaluate as HTMLElement, {
      scrollY: true,
      click: true
    })
    return bs
  }

  // 创建完成
  private created () {
    this.getComment()
  }
}
</script>

<style scoped lang="less">
.evaluate {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f2f6f9;

  .content {
    width: 100%;
    height: auto;
    .getRatingApitart {
      width: 100%;
      height: 307px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #cccccc;
      background-color: #fff;

      .rat_left {
        width: 42%;
        height: 80%;
        border-right: 3px solid #cdcdcd;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        h1 {
          font-size: 45px;
          font-weight: 700;
          color: #ff8b01;
        }

        .overAll {
          font-size: 40px;
          font-weight: 700;
          color: #000;
        }

        p {
          font-size: 35px;
          color: #bebebe;
        }
      }

      .rat_right {
        width: 56%;
        height: 80%;
        margin-right: 1%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }

      .rat_item {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        /deep/.van-rate {
          font-size: 45px;
        }

        p {
          font-size: 35px;
          font-weight: 700;
          margin: 0 13px;
        }

        h2 {
          font-size: 20px;
          color: #bababa;
        }
      }
    }

    .ratingNum {
      padding: 0 60px;
      box-sizing: border-box;
      border-top: 3px solid #cccccc;
      margin-top: 60px;
      width: 100%;
      min-height: 100px;
      background-color: #fff;

      .ratingBox {
        height: 220px;
        border-bottom: 3px solid #ececec;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .box_item {
          padding: 0 30px;
          height: 100px;
          margin-right: 30px;
          text-align: center;
          line-height: 100px;
          font-size: 40px;
          color: #7b8083;
          // color: #fff;
        }
        :nth-child(1){
          background-color: #bbedff;
        }
        :nth-child(2){
          background-color: #cdedf8;
        }
        :nth-child(3){
          background-color: #e8ecef;
        }
        .active{
          background-color:#1989f9;
          color: #fff;
        }
      }

      .onlyRead {
        box-sizing: border-box;
        width: 100%;
        height: 180px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        p {
          font-size: 40px;
          color: #aeaeae;
        }
      }
    }

    .getRatingApi {
      padding: 0 60px 60px;
      box-sizing: border-box;
      border-top: 3px solid #cfcfcf;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
