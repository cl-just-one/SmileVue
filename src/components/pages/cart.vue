<template>
    <div>
        <div class="cart-nav-bar">
            <van-nav-bar title="购物车列表"/>
        </div>
        <!--清空购物车-->
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <div class="cart-list">
            <div class="pang-row" v-for="(item, idx) in cartInfo" :key="idx">
                <div class="pang-img">
                    <img :src="item.image" width="100%">
                </div>
                <div class="pang-text">
                    <div class="pang-name">{{item.name}}</div>
                    <div class="pang-control">
                        <van-stepper :count="item.count"/>
                    </div>
                </div>
                <div class="pang-goods-price">￥{{item.price}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty: false
            }
        },
        created() {
            this.getCartInfo();
        },
        methods: {
            getCartInfo() {
                if (localStorage.cartInfo) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                this.isEmpty = this.cartInfo.length ? true : false
            },
            clearCart() {
                localStorage.removeItem('cartInfo');
                this.cartInfo = []
            }
        },
    }
</script>

<style scoped>
    .cart-title {
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
        text-align: right;
    }
    .cart-list {
        background-color: #fff;
    }
    .pang-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: .5rem;
        font-size: .85rem;
        border-bottom: 1px solid #E4E7ED;
    }
    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
    }
    .pang-control{
        padding-top: 10px;
    }
    .pang-goods-price{
        flex:4;
        text-align: right;
    }
</style>