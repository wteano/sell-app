<template>
  <div class="app">
    <header>
      <div class="top">
        <div class="shopname">
          <img src="@/assets/imgs/bg.png" alt="">
          <div class="">
            <p>乡村基(高新金融店)</p>
            <p>蜂鸟专送/38分钟送达</p>
            <p>单人精彩套餐</p>
          </div>
        </div>
        <van-notice-bar left-icon="volume-o" text="尊敬的客官，六一。" background="rgb(0 0 0 / 30%)" color="#fff" mode="link" />
      </div>
      <van-tabbar active-color="#ee0a24" inactive-color="#000" border route :fixed="false">
        <van-tabbar-item to="/goods">商品</van-tabbar-item>
        <van-tabbar-item to="/rate">评价</van-tabbar-item>
        <van-tabbar-item to="/shop">商家</van-tabbar-item>
      </van-tabbar>
    </header>
    <main class="noscrollBar">
      <router-view></router-view>
    </main>
    <footer>
      <div><i class=""></i></div>
      <span>未选购商品</span>
      <van-button color="#2b343b">￥20起送</van-button>
    </footer>
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
  width: 375px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  width: 375px;
  height: 200px;
  background-image: url(@/assets/imgs/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .top {
    position: relative;
    width: 100%;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;

    .shopname {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 110px;
      color: #fff;

      img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
    }
  }

  .van-tabbar-item/deep/ {
    font-size: 18px;
    font-weight: 600;
  }
}

main {
  flex: 1;
  height: calc(100vh - 250px);
  width: 375px;
  //background-color: #f44;
  overflow-y: scroll;
}

footer {
  width: 375px;
  height: 50px;
  background-color: #131d27;
  color: #828b92;

  .van-button/deep/ {
    height: 100%;
    float: right;

    span {
      color: #828b92;
    }

  }
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
