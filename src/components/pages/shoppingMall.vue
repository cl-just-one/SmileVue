<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img class="search-icon" :src="locationImg" width="80%">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="swipe-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%" height="100rem"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--adbanner area-->
        <div class="adbanner-area">
            <img v-lazy="adBanner" width="100%" />
        </div>
        <!--recommend-->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, idx) in recommendGoods" :key="idx">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, idx) in hotGoods" :key="idx">
                            <goodsInfo
                                :goodsId="item.goodsId"
                                :goodsImage="item.image"
                                :goodsName="item.name"
                                :goodsPrice="item.price"/>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorcomponent'
    import goodsInfo from '../component/goodsInfoComponent'
    import { toMoney } from '@/filter/moneyFilter'
    import URL from "@/serviceAPI.config"

    export default {
        data() {
            return {
                swiperOption: {
                    slidesPerView: 3
                },
                locationImg: require('../../assets/images/location.png'),
                bannerPicArray: [],
                category: [],
                adBanner: '',
                recommendGoods: [],
                floor1: [],
                floor2: [],
                floor3: [],
                floorName: {},
                hotGoods: []
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        components: {
            swiper,
            swiperSlide,
            floorComponent,
            goodsInfo
        },
        created() {
            axios({
                url: URL.getShopingMallInfo,
                method: "get"
            }).then(response => {
                if (response.status == 200) {
                    this.category = response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray = response.data.data.slides;
                    this.recommendGoods = response.data.data.recommend;
                    this.floor1 = response.data.data.floor1;
                    this.floor2 = response.data.data.floor2;
                    this.floor3 = response.data.data.floor3;
                    this.floorName = response.data.data.floorName;
                    this.hotGoods = response.data.data.hotGoods;
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-icon {
        height: 2rem;
        padding-top: .2rem;
        padding-left: .2rem;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #fff;
        background-color: #e5017d;
        color: #fff;
    }
    .swipe-area {
        clear: both;
        width: 20rem;
        overflow: hidden;
    }
    .type-bar {
        background-color: #fff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .type-bar div {
        padding: .3rem;
        font-size: 12px;
        text-align: center;
        flex: 1;
    }
    .recommend-area {
        background-color: #fff;
        margin-top: .3rem;
    }
    .recommend-title {
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem .2rem .2rem .8rem;
        color: #e5017d;
    }
    .recommend-body {
        border-bottom: 1px solid #eee;
    }
    .recommend-item {
        width: "90%";
        font-size: 12px;
        text-align: center;
    }
    .hot-area {
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
    }
    .hot-goods {
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>