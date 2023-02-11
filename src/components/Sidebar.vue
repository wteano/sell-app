<template>
    <van-sidebar v-model="activeKey" >
      <van-sidebar-item  v-for="(item,index) in items" :key="index" :title="item.text" :badge="0" />
    </van-sidebar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Cate } from '@/type'
@Component
export default class Sidebar extends Vue {
  activeKey = 1;
  @Prop({ type: Array, default: [] }) items!: Array<Cate>;
}
</script>

<style lang="less" scoped>
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
</style>
