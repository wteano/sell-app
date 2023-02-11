<template>
    <div class="ratingItem">
        <div class="item_top">
            <div class="item_pic">
                <img :src="Rating.avatar" />
            </div>
            <div class="start">
                <div class="">
                    <p>{{ Rating.username }}</p>
                    <div class="dpflex">
                        <van-rate v-model="Rating.score" :size="20" color="#ffd21e" allow-half void-icon="star"
                            void-color="#eee" />
                        <div class="minite">{{ Rating.deliveryTime?Rating.deliveryTime:Math.round(Math.random() * 60 +20 ) }}分钟送达</div>
                    </div>
                </div>
                <div class="date">{{ Rating.rateTime }}</div>
            </div>
        </div>
        <div class="item_bom">{{ Rating.text }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Rating } from '@/type'

@Component
export default class Evaluate extends Vue {
  @Prop({ type: Object, default: () => ({}) }) Rating! : Rating
}

</script>

<style lang="less" scoped>
.ratingItem {
    box-sizing: border-box;
    width: 100%;
    padding: 60px 0;
    border-bottom: 3px solid #c9c9c9;

    .item_top {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .item_pic {
            width: 110px;
            height: 110px;
            border-radius: 50%;

            img {
                width: 110px;
                height: 110px;
                border-radius: 50%;
                object-fit: contain;
            }
        }

        .start {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 30px;
            height: 100%;

            p {
                margin-bottom: 20px;
                width: 100%;
                // height: 50%;
                font-size: 16px;
            }

            .minite {
                margin-left: 30px;
                // width: 70px;
                height: 100%;
                font-size: 30px;
                line-height: 75px;
                color: #41404097;
            }

            .date {
                // width: 100px;
                height: 100%;
                font-weight: 700;
            }
        }
    }

    .item_bom {
        margin: 30px 50px 0 120px;
        font-size: 40px;
        font-weight: 500;
    }
}
</style>
