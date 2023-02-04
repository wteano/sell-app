<template>
  <div class="sidebar">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item title="标签名称" badge="5" />
      <van-sidebar-item title="标签名称" badge="5" />
      <van-sidebar-item title="标签名称" badge="5" />
    </van-sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {
  activeKey = 0;
}
</script>

<style lang="less" scoped>
.sidebar {
  height: 100%;
}
</style>
