<template>
    <div class="goodsList">
        <div class="list-item" v-for="item in goodsList" :key="item.name">
            <div class="catename">{{ item.name }}</div>
            <van-card v-for="v in item.foods" :key="v.id" :price="v.price" :title="v.name" :thumb="v.imgUrl">
                <!-- price-top -->
                <template #desc>
                    <p>{{ v.goodsDesc }}</p>
                    <p>月售{{ v.sellCount }}份&emsp;好评率{{ v.rating }}%</p>
                </template>
                <template #footer>
                    <!-- <van-button icon="minus" round type="info" size="small"></van-button> -->
                    <van-button icon="plus" round type="info" size="small"></van-button>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GoodsItem } from '@/type'

@Component
export default class GoodsList extends Vue {
    @Prop({ type: Array, default: () => [] }) goodsList!: Array<GoodsItem>
}
</script>

<style lang="less" scoped>
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
    }
}
</style>
