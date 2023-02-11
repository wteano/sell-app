<template>
  <div class="infoView">
    <div class="info">
      <div class="infoitem">
        <div class="backBox" @click="$router.back()">
          <van-icon class="back" name="arrow-left"></van-icon>
        </div>
        <img :src="foods.imgUrl" alt="">
        <div class="btnBox">
          <h1>{{ foods.name }}</h1>
          <p>月售{{ foods.sellCount }}份&emsp;好评率{{ foods.rating }}%</p>
          <div class="dpflex">
            <p>￥{{ (foods.price).toFixed(2) }}</p>
            <van-button v-if="foods.num == 0" @click="addGoods(foods)" round type="info">加入购物车</van-button>
            <van-stepper v-else v-model="foods.num" theme="round" min="0" :show-input="foods.num != 0 ? true : false"
              :show-minus="foods.num != 0 ? true : false" button-size="22" @plus="addGoods(foods)"
              @minus="reduceGoods(foods)" disable-input />
          </div>
        </div>
        <div class="descBox">
          <h1>商品介绍</h1>
          <p>{{ foods.goodsDesc }}</p>
        </div>
        <div class="ratingNum">
          <div class="ratingBox">
            <div class="box_item" @click="filterRate(0)" :class="num == 0 ? 'active' : ''">全部 {{ ratingList0.length }}</div>
            <div class="box_item" @click="filterRate(1)" :class="num == 1 ? 'active' : ''">推荐 {{ ratingList1.length }}</div>
            <div class="box_item" @click="filterRate(2)" :class="num == 2 ? 'active' : ''">吐槽 {{ ratingList2.length }}</div>
          </div>
        </div>
        <div class="getRatingApi">
          <div class="ratingBox">
            <Evaluate v-for="(item, index) in ratings" :key="index" :Rating="item"></Evaluate>
          </div>
        </div>
      </div>
    </div>
    <shop-car></shop-car>
  </div>
</template>

<script lang="ts">
import { Food, Rate } from '@/type'
import { Component, Vue } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
import { getDate } from '@/utils/common'
import Evaluate from '@/components/Evaluate.vue'
import ShopCar from '@/components/ShopCar.vue'
@Component({
  components: {
    Evaluate, ShopCar
  }
})
export default class GoodsInfo extends Vue {
  num = 0
  // 评论的列表
  ratings: Array<Rate> = [];
  ratingList: Array<Rate> = [];
  ratingList0: Array<Rate> = [];
  ratingList1: Array<Rate> = [];
  ratingList2: Array<Rate> = [];
  get foods () {
    return this.$store.state.goods as Food
  }

  // 点击添加商品
  addGoods (item:Food) {
    this.$store.commit('goodsAdd', item)
    // this.$forceUpdate()
  }

  // 点击减少商品
  reduceGoods (item:Food) {
    // item.num! -= 1
    if (item.num && item.num < 1) {
      item.num = 0
      return
    }
    this.$store.commit('goodsReduce', item)
  }

  // 获取数据
  async getComment () {
    // 评论的数据
    this.ratingList = this.foods.ratings.map((item) => {
      item.rateTime = getDate(item.rateTime, 'yyyy/mm/dd')
      item.score = Math.random() * 5
      return item
    })
    this.ratingList0 = this.ratingList
    this.ratings = this.ratingList0
    this.ratingList1 = this.ratingList0.filter(item => item.rateType === 0)
    this.ratingList2 = this.ratingList0.filter(item => item.rateType === 1)
    // console.log(this.ratingList)
  }

  //
  // filterChange () {
  //   if (this.checked === true) {
  //     this.ratingList0 = this.ratingList.filter(item => item.text !== '')
  //     // if (this.num === 0) {
  //     this.ratings = this.ratingList0
  //     // } else if (this.num === 1) {
  //     this.ratingList1 = this.ratingList0.filter(item => item.rateType === 0)
  //     // } else if (this.num === 2) {
  //     this.ratingList2 = this.ratingList0.filter(item => item.rateType === 1)
  //     // }
  //   } else {
  //     this.ratingList0 = this.ratingList
  //     // if (this.num === 0) {
  //     this.ratings = this.ratingList0
  //     // } else if (this.num === 1) {
  //     this.ratingList1 = this.ratingList0.filter(item => item.rateType === 0)
  //     // } else if (this.num === 2) {
  //     this.ratingList2 = this.ratingList0.filter(item => item.rateType === 1)
  //     // }
  //   }
  // }

  // 筛选评论
  filterRate (num:number) {
    this.num = num
    if (num === 0) {
      this.ratings = this.ratingList0
    } else if (num === 1) {
      this.ratings = this.ratingList1
    } else if (num === 2) {
      this.ratings = this.ratingList2
    }
  }

  // 滚动
  pjscroll () {
    const Evaluate = document.querySelector('.info')
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

  private mounted () {
    this.pjscroll()
  }
}
</script>

<style lang="less" scoped>
.infoView {
  width: 100%;
  height: 100%;
  background-color: #f4f5f9;

  .info {
    width: 100%;
    height: calc(100vh - 150px);
  }

  .infoitem {
    width: 100%;
    height: auto;
  }

  .backBox {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .back {
      position: absolute;
      top: 1px;
      left: -10px;
      font-size: 100px;
      color: #fff;
    }
  }

  img {
    width: 100%;
    height: 980px;
    object-fit: 100% 100%;
  }

  .btnBox {
    box-sizing: border-box;
    padding: 0 60px;
    width: 100%;
    height: 404px;
    border-bottom: 3px solid #ccc;
    background-color: #fff;

    h1 {
      font-size: 50px;
    }

    p {
      margin: 30px 0;
      color: #bbb;
      font-size: 40px;
    }

    .dpflex {
      justify-content: space-between;
      align-items: center;

      p {
        font-weight: 600;
        color: #f60;
      }
    }

    /deep/.van-stepper--round .van-stepper__plus,
    /deep/.van-stepper--round .van-stepper__minus {
      background-color: #1989fa;
      color: #fff;
      border: 0;
    }
  }

  .descBox {
    box-sizing: border-box;
    padding: 60px 60px 0;
    margin-top: 60px;
    // border-top: 3px solid #ccc;
    border-top: 3px solid #ccc;
    height: 318px;
    background-color: #fff;

    h1 {
      margin-bottom: 40px;
      font-size: 45px;
    }

    p {
      color: #989a98;
      font-size: 40px;
      font-weight: 500;
    }
  }

  .ratingNum {
    padding: 0 60px;
    box-sizing: border-box;
    border-top: 3px solid #cccccc;
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

      :nth-child(1) {
        background-color: #bbedff;
      }

      :nth-child(2) {
        background-color: #cdedf8;
      }

      :nth-child(3) {
        background-color: #e8ecef;
      }

      .active {
        background-color: #1989f9;
        color: #fff;
      }
    }
  }

  .getRatingApi {
    padding: 0 60px 60px;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    background-color: #fff;
  }
}
</style>
