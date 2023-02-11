<template>
  <div class="goods">
    <div class="goodsnav">
      <van-sidebar v-model="active" >
      <van-sidebar-item  v-for="(item,index) in goodsList" @click="changeNav" :key="index" :title="item.name" :badge="item.total!=0?item.total:''" />
    </van-sidebar>
    </div>
    <div class="list">
      <div class="goodsList">
        <div class="list-item" v-for="(item,index) in goodsList" :key="item.name">
            <div class="catename">{{ item.name }}</div>
            <van-card v-for="v in item.foods" :key="v.id" :price="(v.price).toFixed(2)" :title="v.name" :thumb="v.imgUrl" @click="toInfo(v)">
                <!-- price-top -->
                <template #desc>
                    <p>{{ v.goodsDesc }}</p>
                    <p>月售{{ v.sellCount }}份&emsp;好评率{{ v.rating }}%</p>
                </template>
                <template #footer>
                    <div @click.stop>
                      <van-stepper  v-model="v.num" theme="round" min="0" :show-input="v.num!=0?true:false" :show-minus="v.num!=0?true:false"
                    button-size="22" @plus="addGoods(v,index)" @minus="reduceGoods(v,index)" disable-input />
                    </div>
                </template>
            </van-card>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll, { BScrollInstance, TranslaterPoint } from '@better-scroll/core'
import { Component, Watch, Vue } from 'vue-property-decorator'
import { GoodsItem, Cate, Food } from '@/type'
import { goodsListApi } from '@/api/index'

@Component({
  components: {
    // Sidebar,
    // GoodsList
  }
})
export default class Goods extends Vue {
  active=0
  categories: Array<Cate> = []
  goodsList: Array<GoodsItem> = []
  goodsNavs :BScrollInstance | null = null
  goodsItems :BScrollInstance | null= null
  async initData () {
    const res = await goodsListApi({
      appId: 'string',
      plat: 'string'
    })
    // this.goodsList = JSON.parse(JSON.stringify(res.goodsList))
    // // 需要数据重新挟持，或用数组的变更方法
    // this.goodsList.forEach((item:GoodsItem) => {
    //   item.total = 0
    //   item.foods.forEach((item1:Food) => {
    //     item1.num = 0
    //   })
    // })
    // console.log(res)
    this.goodsList = res.goodsList.map((item:GoodsItem) => {
      item.total = 0
      item.foods.map((item1:Food) => {
        item1.num = 0
        return item1
      })
      return item
    })
    this.$store.state.cateList = res.goodsList.map(item => ({ name: item.name, total: (item.total as number) }))
    // console.log(this.goodsList)
    // dom节点渲染完成，执行该代码
    this.$nextTick(() => {
      this.goodsNavs = this.domScroll('.goodsnav')
      this.goodsItems = this.domScroll('.list')
      this.goodsItems.on('scroll', this.onScroll)
    })
  }

  get carList () {
    return this.$store.state.carList as Array<Food>
  }

  @Watch('carList', { immediate: true, deep: true })
  cateTotalChange () {
    // console.log('+++++')
    this.goodsList.forEach(item => {
      const totalList = this.carList.filter(item1 => item.name === item1.category)
      // console.log(totalList)
      // 计算单个分类的商品在购物车的总数
      let total = 0
      if (totalList.length) {
        totalList.forEach((goods:Food) => {
          goods.num && (total += goods.num)
        })
      }
      item.total = total
    })
  }

  // 点击添加商品
  addGoods (item:Food, index: number) {
    // item.num! += 1
    // console.log($event)
    // 1、
    (this.goodsList[index].total as number) += 1
    // // 2、数组的变更方法
    // const cateFoods = { ...this.goodsList[index] }
    // cateFoods.total && cateFoods.total++
    // this.goodsList.splice(index, 1, cateFoods)
    this.$store.commit('goodsAdd', item)
    this.$forceUpdate()
  }

  // 点击减少商品
  reduceGoods (item:Food, index: number) {
    // item.num! -= 1
    if (item.num && item.num < 1) {
      item.num = 0
      return
    }
    (this.goodsList[index].total as number) -= 1
    // // 2、数组的变更方法
    // const cateFoods = { ...this.goodsList[index] }
    // cateFoods.total && cateFoods.total--
    // this.goodsList.splice(index, 1, cateFoods)
    this.$store.commit('goodsReduce', item)
    this.$forceUpdate()
  }

  toInfo (foods:Food) {
    // event.preventDefault()
    // console.log(id)
    // return 0
    this.$store.commit('goodsInfo', foods)
    this.$router.push('/goodsinfo?')
  }

  // 点击左边导航的某一个，切换
  changeNav (index:number) {
    // this.activeKey = index
    const cateNames = document.querySelectorAll('.catename')[index]
    this.goodsItems?.scrollToElement(cateNames as HTMLElement, 1000, 0, 0)
  }

  // 滚动的方法
  domScroll (val :string) {
    const dom = document.querySelector(val)
    const bs = new BScroll(dom as HTMLElement, { click: true, probeType: 2 })
    return bs
  }

  // 滚动事件的监听
  onScroll (position:TranslaterPoint) {
    interface Site{
      start:number,
      end:number,
      active:number
    }
    const listItems = document.querySelectorAll('.list-item')
    const siteList:Array<Site> = []
    listItems.forEach((item, index) => {
      siteList.push({
        start: (item as HTMLElement).offsetTop,
        end: (item as HTMLElement).offsetHeight + (item as HTMLElement).offsetTop,
        active: index
      })
    })
    // console.log(siteList)
    // 当前滚动的y轴的偏移量
    const y = Math.abs(position.y)
    // console.log(y)
    const activeObj = siteList.find(item => item.start <= y && item.end >= y)
    this.active = activeObj?.active as number
  }

  private async created () {
    // const res = await goodsListApi({
    //   appId: 'string',
    //   plat: 'string'
    // })
    // console.log(res)
    // this.categories = res.goodsList.map(item => ({ text: item.name }))
    // this.goodsList = res.goodsList
    // console.log(this.goodsList)
    // dom 节点渲染完成后，在执行的代码块（异步代码）this.$nextTick==>异步
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  width: 100%;

  .goodsnav {
    width: 240px;
    overflow: hidden;

    /deep/.van-sidebar {
      width: 100%;
      text-align: center;
    }

    /deep/.van-sidebar-item {
      width: 100%;
      border-bottom: 4px solid #e5e6ec;
      box-sizing: border-box;
    }

    .van-sidebar-item--select::before/deep/ {
      content: '';
      display: none;
    }
  }

  .list {
    flex: 1;
    overflow: hidden;

    .goodsList {
      width: 100%;

      .list-item {
        width: 100%;

        .catename {
          text-indent: 40px;
          font-size: 40px;
          font-weight: 600;
          line-height: 84px;
          background-color: #f2f6f9;
          z-index: 9;
          border-left: 10px solid #d6d6d6;
          box-sizing: border-box;
        }
      }

      /deep/.van-card {
        margin-top: 0;
        background-color: #fff;

        &::after {
          margin-top: 33px;
          content: '';
          display: block;
          width: 100%;
          height: 3px;
          background-color: #e5e6ec;
        }

        .van-card__title~p {
          color: #b1b1b1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }

        .van-card__price {
          span {
            // font-size: 30px;
            font-weight: 600;
            color: #f60;
          }
        }

        .van-button {
          width: 55px;
          height: 55px;
        }

        .van-stepper--round .van-stepper__plus,.van-stepper--round .van-stepper__minus{
          background-color: #1989fa;
          color: #fff;
          border: 0;
        }
      }
    }
  }
}
</style>
