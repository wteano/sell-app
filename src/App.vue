<template>
  <div class="app">
    <main class="noscrollBar">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {

}
</script>

<style lang="less">
.app {
  width: 1080px;
  height: 100%;
}

main {
  width: 1080px;
  height: calc(100vh - 150px);
}
.dpflex{
  display: flex;
}
/* 谷歌无滚动条 */
.noscrollBar::-webkit-scrollbar {
  display: none;
}

a {
  text-decoration: none !important;
}

/* 谷歌滚动条样式 */
.scrollBar::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.scrollBar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.scrollBar::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
