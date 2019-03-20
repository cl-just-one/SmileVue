<template>
    <div>
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goHomePage"
        />
        <div class="goods-image">
            <img v-lazy="goodsInfo.IMAGE1" width="100%"/>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">{{goodsInfo.PRESENT_PRICE}}</div>
        <van-tabs swipeable sticky>
            <van-tab title="商品详情">
                <div class="goods-detail" v-html="goodsInfo.DETAIL"></div>
            </van-tab>
            <van-tab title="商品评论">商品评论制作中</van-tab>
        </van-tabs>
        <div class="goods-bottom-button">
            <div class="bottom-button">
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div class="bottom-button">
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        created() {
            this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
            this.axiosGetDetail()
        },
        methods: {
            axiosGetDetail() {
                axios({
                    url: url.getDetailGoodsInfo,
                    method: 'post',
                    data: {
                        goodsId: this.goodsId
                    }
                }).then(res => {
                    if (res.data.code == 200 && res.data.message) {
                        this.goodsInfo = res.data.message
                    } else {
                        Toast('数据获取失败')
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            goHomePage() {
                this.$router.go(-1)
            },
            addGoodsToCart() {
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
                let isHaveGoods = cartInfo.find(cart => {
                    cart.goodsId = this.goodsId
                })
                if (!isHaveGoods) {
                    let newGoodsInfo = {
                        goodsId: this.goodsInfo.ID,
                        name: this.goodsInfo.NAME,
                        price: this.goodsInfo.PRESENT_PRICE,
                        image: this.goodsInfo.IMAGE1,
                        count: 1
                    }
                    cartInfo.push(newGoodsInfo) // 添加购物车
                    localStorage.cartInfo = JSON.stringify(cartInfo)
                    Toast.success('添加购物车成功')
                } else {
                    Toast.success('已有此商品')
                }
                this.$router.push({
                    name: "Cart"
                })
            }
        }
    }
</script>

<style scoped>
    .goods-name,
    .goods-price {
        background-color: #fff;
    }
    .goods-detail {
        font-size: 0;
    }
    .goods-bottom-button {
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .bottom-button {
        flex: 1;
        padding: 5px;
    }
</style>