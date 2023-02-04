<template>
  <div class="goods">
    <Sidebar></Sidebar>
    <div class="list">
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
      <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { Component, Vue } from 'vue-property-decorator'
import { GoodsType, Cate } from '@/type'

@Component({
  components: {
    Sidebar
  }
})
export default class Goods extends Vue {
  categories: Array<Cate> = [{ text: '分组 1' }, { text: '分组 2' }]
  goodsList: Array<GoodsType> = [{ name: 'xxx', price: 15.99, img: 'xxxxxxxx', cate: 'xxxx' }]
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;

  Sidebar {
    width: 80px;
  }

  .list {
    flex: 1;

    .van-card/deep/ {
      margin-top: 0;
      background-color: #fff;
    }
  }
}
</style>
