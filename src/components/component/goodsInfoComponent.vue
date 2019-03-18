<template>
    <div class="goods-info" @click="goGoodsDetail">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
    import { toMoney } from '@/filter/moneyFilter';
    export default {
        props: ["goodsId", "goodsImage", "goodsName", "goodsPrice"],
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        methods: {
            goGoodsDetail() {
                this.$router.push({
                    name: 'Goods',
                    query: {
                        goodsId: this.goodsId
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .goods-name {
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>